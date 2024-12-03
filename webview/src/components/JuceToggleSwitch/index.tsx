import { useEffect, useState } from "react";
import { getToggleState } from "juce-framework-frontend-mirror";
import { FiPower } from "react-icons/fi";

import styles from "./index.module.css"

interface Props {
  identifier: string;
  inverted?: boolean;
  onChange?: (newValue: boolean) => void
}

export function JuceToggleSwitch({
  identifier,
  inverted = false,
  onChange,
}: Props) {
  const toggleState = getToggleState(identifier)
  const [value, setValue] = useState(toggleState.getValue())

  const handleChange = (newValue: boolean) => {
    toggleState.setValue(newValue);
  };

  useEffect(() => {
    const updateWebViewValue = () => {
      setValue(toggleState.getValue());
    };

    const valueListenerId =
      toggleState.valueChangedEvent.addListener(updateWebViewValue);

    return () => {
      toggleState.valueChangedEvent.removeListener(valueListenerId);
    };
  }, [toggleState, inverted]);

  return (
    <button
      className={styles.button}
      onClick={() => {
        handleChange(!value)
        if (onChange) onChange(!value)
      }}
      data-value={inverted ? !value : value}
    >
      <FiPower size={16} />
    </button>
  );
};
