import { useEffect, useState } from "react";
import { Knob } from "@tremolo-ui/react";
import { getSliderState } from "juce-framework-frontend-mirror";

import knobTheme from "../theme/Knob.module.css";

interface Props {
  identifier: string;
}

export function JuceKnob({
  identifier
}: Props) {
  const sliderState = getSliderState(identifier);
  const [value, setValue] = useState(sliderState.getNormalisedValue());

  const handleChange = (newNormalisedValue: number) => {
    console.log(newNormalisedValue)
    sliderState.setNormalisedValue(newNormalisedValue);
  };

  useEffect(() => {
    const updateWebViewValue = () => {
      setValue(sliderState.getNormalisedValue());
    };

    const valueListenerId =
      sliderState.valueChangedEvent.addListener(updateWebViewValue);

    return () => {
      sliderState.valueChangedEvent.removeListener(valueListenerId);
    };
  }, [sliderState]);

  return (
    <Knob.Root
      className={knobTheme.root}
      aria-label={identifier}
      min={0}
      max={1}
      step={0.001}
      value={value}
      onChange={handleChange}
      startValue={0.5}
      wheel={['normalized', 0.1]}
      keyboard={['normalized', 0.01]}
    >
      <Knob.SVGRoot>
        <Knob.ActiveLine className={knobTheme.activeLine} />
        <Knob.InactiveLine className={knobTheme.inactiveLine} />
        <Knob.Thumb
          className={knobTheme.thumb}
          classes={{ line: knobTheme.thumbLine }}
        />
      </Knob.SVGRoot>
    </Knob.Root>
  );
};
