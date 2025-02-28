import { useEffect, useState } from "react";
import { Slider, SliderTrack } from "@tremolo-ui/react";
import { getSliderState } from "juce-framework-frontend-mirror";

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
    <Slider
      min={0}
      max={1}
      step={0.001}
      value={value}
      onChange={handleChange}
      vertical={vertical}
      wheel={['normalized', 0.1]}
      style={{ flex: '1 1 auto' }}
    >
      <SliderTrack style={{ height: '100%' }} />
    </Slider>
  );
};
