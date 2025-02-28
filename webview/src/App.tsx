import { useState } from 'react'
import { getToggleState } from 'juce-framework-frontend-mirror'

import { JuceCombobox } from './components/JuceCombobox'
import { JuceKnob } from './components/JuceKnob'
import { JuceSlider } from './components/JuceSlider'
import { JuceTextbox } from './components/JuceTextbox'
import { JuceToggleSwitch } from './components/JuceToggleSwitch'

import styles from './App.module.css'

function App() {
  const toggleState = getToggleState("bypass")
  const [bypass, setBypass] = useState(toggleState.getValue());

  return (
    <div className={styles.container}>
      <div className={styles.power_button}>
        <JuceToggleSwitch identifier="bypass" inverted={true} onChange={setBypass} />
      </div>
      <div
        className={styles.cover}
        data-bypass={bypass}
      ></div>
      <main className={styles.main}>
        <h1>Pan</h1>
        <JuceKnob identifier="panAngle" />
        <JuceTextbox identifier="panAngle" digits={0} />
        <JuceCombobox identifier="panRule" />
        <h1 style={{ marginTop: '0.5rem' }}>Gain</h1>
        <JuceSlider identifier="gain" />
        <JuceTextbox identifier="gain" suffix="dB" />
      </main>
    </div>
  )
}

export default App
