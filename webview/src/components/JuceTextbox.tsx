import { useEffect, useState } from "react"
import { InputNumber } from "antd"
import { getSliderState } from "juce-framework-frontend-mirror"

interface Props {
  identifier: string
  digits?: number
  suffix?: string
}

export function JuceTextbox({
  identifier,
  digits = 2,
  suffix = "",
}: Props) {
  const sliderState = getSliderState(identifier)
  const [value, setValue] = useState<string>(
    sliderState.getScaledValue().toFixed(digits)
  )
  const [tempValue, setTempValue] = useState<string>(
    String(sliderState.getScaledValue())
  )
  const [isFocused, setIsFocused] = useState(false)

  const changeJUCEParamValue = (newScaledValue: number) => {
    const newNormalisedValue = Math.pow(
      (newScaledValue - sliderState.properties.start) /
        (sliderState.properties.end - sliderState.properties.start),
      sliderState.properties.skew
    )
    sliderState.setNormalisedValue(newNormalisedValue)
  }

  useEffect(() => {
    const updateWebViewValue = () => {
      setValue(sliderState.getScaledValue().toFixed(digits))
    }

    const valueListenerId =
      sliderState.valueChangedEvent.addListener(updateWebViewValue)

    return () => {
      sliderState.valueChangedEvent.removeListener(valueListenerId)
    }
  }, [sliderState, digits])

  return (
    <InputNumber
      suffix={suffix}
      style={{ width: "100%" }}
      id="input-number"
      controls={false}
      value={isFocused ? parseFloat(tempValue) : parseFloat(value)}
      onChange={(v) => {
        if (v !== null) {
          if (isFocused) {
            setTempValue(v.toFixed(digits))
          }
        }
      }}
      onFocus={(event) => {
        setTempValue(value)
        setIsFocused(true)
        setTimeout(() => {
          event.target.select()
        }, 100)
      }}
      onBlur={() => {
        const newValue = parseFloat(tempValue)
        if (!isNaN(newValue)) {
          changeJUCEParamValue(newValue)
        }
        setIsFocused(false)
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.currentTarget.blur()
        }
      }}
    />
  )
}
