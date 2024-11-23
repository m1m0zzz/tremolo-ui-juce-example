import { FC, useEffect, useState } from "react";
import { Select } from "antd";
import { getComboBoxState } from "juce-framework-frontend-mirror";

interface JuceComboboxProps {
  identifier: string;
}

const JuceCombobox: FC<JuceComboboxProps> = ({ identifier }) => {
  const comboboxState = getComboBoxState(identifier);
  const [value, setValue] = useState<number>(comboboxState.getChoiceIndex());

  const changeJUCEParamValue = (newValue: number) => {
    comboboxState.setChoiceIndex(newValue);
  };

  useEffect(() => {
    const updateWebViewValue = () => {
      setValue(comboboxState.getChoiceIndex());
    };

    const valueListenerId =
      comboboxState.valueChangedEvent.addListener(updateWebViewValue);

    return () => {
      comboboxState.valueChangedEvent.removeListener(valueListenerId);
    };
  }, [comboboxState]);

  return (
    <Select
      value={value}
      style={{ width: "100%" }}
      onChange={(v) => {
        changeJUCEParamValue(v as number);
      }}
      options={comboboxState.properties.choices.map(
        (choice: string, index: number) => ({
          label: choice,
          value: index,
        })
      )}
    />
  );
};

export default JuceCombobox;
