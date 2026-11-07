import { useEffect, useState } from "react";
import { Slider } from "@tremolo-ui/react";
import { getSliderState } from "juce-framework-frontend-mirror";

import sliderTheme from "../theme/Slider.module.css";

interface Props {
  identifier: string;
  vertical?: boolean;
}

export function JuceSlider({
  identifier,
  vertical = true,
}: Props) {
  const sliderState = getSliderState(identifier);
  const [value, setValue] = useState<number>(sliderState.getNormalisedValue());

  const handleChange = (newNormalisedValue: number) => {
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
    <Slider.Root
      className={sliderTheme.root}
      min={0}
      max={1}
      step={0.001}
      value={value}
      onChange={handleChange}
      orientation={vertical ? 'vertical' : 'horizontal'}
      wheel={['normalized', 0.1]}
      keyboard={['normalized', 0.01]}
      style={{ flex: '1 1 auto' }}
    >
      <Slider.Track
        className={sliderTheme.track}
        style={vertical ? { '--length': '100%' } : undefined}
      >
        <Slider.Thumb className={sliderTheme.thumb} aria-label={identifier} />
      </Slider.Track>
    </Slider.Root>
  );
};
