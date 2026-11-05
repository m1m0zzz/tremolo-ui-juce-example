cmake_minimum_required(VERSION 3.22)

project(TREMOLO_JUCE_EXAMPLE LANGUAGES C CXX VERSION 0.0.1)

# Use the JUCE in lib/JUCE, not one installed globally.
add_subdirectory(lib/JUCE)

juce_add_plugin(TremoloJUCEExample
    COMPANY_NAME "mimoz"
    PLUGIN_MANUFACTURER_CODE Mimz
    PLUGIN_CODE Trjx
    IS_SYNTH FALSE
    FORMATS VST3 Standalone
    VST3_CATEGORIES "Fx"
    # The editor shows a WebBrowserComponent.
    NEEDS_WEB_BROWSER TRUE
    # Link WebView2 statically on Windows, as JUCE_USE_WIN_WEBVIEW2_WITH_STATIC_LINKING in the .jucer.
    NEEDS_WEBVIEW2 TRUE
    PRODUCT_NAME "TremoloJUCEExample")

juce_generate_juce_header(TremoloJUCEExample)

target_compile_features(TremoloJUCEExample PUBLIC cxx_std_17)

target_sources(TremoloJUCEExample PRIVATE
    Source/PluginEditor.cpp
    Source/PluginProcessor.cpp)

# The same options as JUCEOPTIONS in TremoloJUCEExample.jucer.
target_compile_definitions(TremoloJUCEExample
    PUBLIC
        JUCE_WEB_BROWSER=1
        JUCE_USE_CURL=0
        JUCE_STRICT_REFCOUNTEDPOINTER=1
        JUCE_VST3_CAN_REPLACE_VST2=0
        JUCE_USE_WIN_WEBVIEW2_WITH_STATIC_LINKING=1)

target_link_libraries(TremoloJUCEExample
    PRIVATE
        juce::juce_audio_utils
        juce::juce_dsp
    PUBLIC
        juce::juce_recommended_config_flags
        juce::juce_recommended_warning_flags)
