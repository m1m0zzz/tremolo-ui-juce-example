import { useEffect, useState } from "react";
import { Slider } from "@tremolo-ui/react";
import { getSliderState } from "juce-framework-frontend-mirror";

interface Props {
  identifier: string;
  isVertical?: boolean;
}

export function JuceSlider({
  identifier,
  isVertical = false,
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
    <Slider
      min={0}
      max={1}
      step={0.001}
      value={value}
      onChange={handleChange}
      direction={isVertical ? 'up' : 'right'}
      enableWheel={['normalized', 0.1]}
      style={{display: 'block', margin: '10px auto'}}
    />
  );
};
