import { FC, useEffect, useState } from "react";
import { Slider } from "antd";
import { getSliderState } from "juce-framework-frontend-mirror";

interface JuceSliderProps {
  identifier: string;
  isVertical?: boolean;
}

const JuceSlider: FC<JuceSliderProps> = ({
  identifier,
  isVertical = false,
}) => {
  const sliderState = getSliderState(identifier);
  const [value, setValue] = useState<number>(sliderState.getNormalisedValue());

  const changeJUCEParamValue = (newNormalisedValue: number) => {
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

  const style = isVertical ? {} : { width: "100%" };

  return (
    <Slider
      vertical={isVertical}
      min={0}
      max={1}
      step={0.001}
      value={value}
      onChange={(v) => {
        changeJUCEParamValue(v);
      }}
      tooltip={{ open: false }}
      style={style}
    />
  );
};

export default JuceSlider;
