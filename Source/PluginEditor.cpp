#include "PluginEditor.h"

#include "PluginProcessor.h"

//==============================================================================
TremoloJUCEExampleAudioProcessorEditor::TremoloJUCEExampleAudioProcessorEditor(
    TremoloJUCEExampleAudioProcessor& p)
    : AudioProcessorEditor(&p), audioProcessor(p) {

  addAndMakeVisible(webComponent);
  webComponent.goToURL("http://localhost:5173/");
  //webComponent.goToURL(juce::WebBrowserComponent::getResourceProviderRoot());
  setResizable(true, true);
  setResizeLimits(180, 100, 1920, 1080);
  setSize(400, 600);
}

TremoloJUCEExampleAudioProcessorEditor::~TremoloJUCEExampleAudioProcessorEditor() {}

//==============================================================================
void TremoloJUCEExampleAudioProcessorEditor::paint(juce::Graphics& g) {
  g.fillAll(
      getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId));
}

void TremoloJUCEExampleAudioProcessorEditor::resized() {
  webComponent.setBounds(getLocalBounds());
}

std::optional<juce::WebBrowserComponent::Resource>
TremoloJUCEExampleAudioProcessorEditor::getResource(const juce::String& url) {
  const auto urlToRetrive = url == "/"
                                ? juce::String{"index.html"}
                                : url.fromFirstOccurrenceOf("/", false, false);

  //static auto streamZip = juce::MemoryInputStream(
  //    juce::MemoryBlock(BinaryData::assets_zip, BinaryData::assets_zipSize),
  //    true);

  //static juce::ZipFile archive{streamZip};

  //if (auto* entry = archive.getEntry(urlToRetrive)) {
  //  auto entryStream = rawToUniquePtr(archive.createStreamForEntry(*entry));
  //  std::vector<std::byte> result((size_t)entryStream->getTotalLength());
  //  entryStream->setPosition(0);
  //  entryStream->read(result.data(), result.size());

  //  auto mime = getMimeForExtension(
  //      entry->filename.fromLastOccurrenceOf(".", false, false).toLowerCase());
  //  return juce::WebBrowserComponent::Resource{std::move(result),
  //                                             std::move(mime)};
  //}
  return std::nullopt;
}

const char* TremoloJUCEExampleAudioProcessorEditor::getMimeForExtension(
    const juce::String& extension) {
  static const std::unordered_map<juce::String, const char*> mimeMap = {
      {{"htm"}, "text/html"},
      {{"html"}, "text/html"},
      {{"txt"}, "text/plain"},
      {{"jpg"}, "image/jpeg"},
      {{"jpeg"}, "image/jpeg"},
      {{"svg"}, "image/svg+xml"},
      {{"ico"}, "image/vnd.microsoft.icon"},
      {{"json"}, "application/json"},
      {{"png"}, "image/png"},
      {{"css"}, "text/css"},
      {{"map"}, "application/json"},
      {{"js"}, "text/javascript"},
      {{"woff2"}, "font/woff2"}};

  if (const auto it = mimeMap.find(extension.toLowerCase());
      it != mimeMap.end())
    return it->second;

  jassertfalse;
  return "";
}
