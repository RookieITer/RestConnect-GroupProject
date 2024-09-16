import React, { useState, useRef  } from 'react';
import { Heading, Loader, Card, Button, Message, ThemeProvider, createTheme, DropZone, VisuallyHidden, Tabs, Flex, View, Divider} from '@aws-amplify/ui-react'; 
import '@aws-amplify/ui-react/styles.css';          // amplify react styling
import 'mapbox-gl/dist/mapbox-gl.css';              // for mapbox

// determine file types to be processed.  Limit these types jpg, png, gif, bmp at this time
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp', 'image/gif'];

// theme to bypass the default theme used for the drop zone.
const dztheme = createTheme({
  name: 'dropzone-theme',
  tokens: {
    components: {
      dropzone: {
        backgroundColor: '#f9fdff',
        borderColor: '{colors.primary.80}',
      },
    },
  },
});


// custom theme for tabs bar to provide better feedback.
const tabtheme = createTheme({
  name: 'tabs-theme',
  tokens: {
    components: {
      tabs: {
        item: {
          color: { value: '#666666' },
          _hover: {
            color: { value: '#66bbbb' },
          },
          _focus: {
            color: { value: '{colors.blue.60}' },
          },
          _active: {
            color: { value: '#666666' },
            backgroundColor: { value: '#f1f1f1' },
          },
          _disabled: {
            color: { value: 'gray' },
            backgroundColor: { value: 'transparent' },
          },
        },
      },
    },
  },
});

//-------------------------------------------------------------------------
// Main export routine for this screen
//-------------------------------------------------------------------------

export const CanIParkHere: React.FC = () => {
    const [files, setFiles] = useState([] as File[]); 
    const [hasFile, setHasFile] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const hiddenInput = React.useRef<HTMLInputElement | null>(null);
    const [imgSrc, setImgSrc] = useState('')
    const imgRef = useRef<HTMLImageElement>(null)
    const [tab, setTab] = useState('0');

    // placeholders FOR TESTING ONLY
    // don't name variables this way!
    const [var3, setVar3] = useState('');

    // diplays the loader that displays while the file is being processed
    const  ShowLoader= () => {
        return <Loader variation="linear" />;
    };


    //-------------------------------------------------------------------------
    // TABS DISPLAY
    // this has all the active  html content used for the
    // on this function.  It has it's own function here so we can 
    // programatically control the active tab
    //-------------------------------------------------------------------------

    const ControlledTabDisplay = () => {
        return (
          <ThemeProvider theme={tabtheme} colorMode="light">
            <Tabs value={tab} onValueChange={(tab) => setTab(tab)}  
            items={[

                //-------------------------------------------------------------
                // Tab 0
                // Start here option with text
                //-------------------------------------------------------------

                { label: 'Start Here', value: '0', 
                    content: ( 
                      <>
                        In this screen, you can upload a photo of a parking sign (and/or take a photo if your device allows)
                        <br />
                        We'll then provide you with further information about the details on the sign.
                        <br />
                        This can help you avoid parking fines.
                        <br /><br />
                        Note: the advice here is provided mainly for drivers of cars, vans and trucks.
                        <br />
                        <Message
                          variation="filled" colorTheme ="info" backgroundColor={"#f5faff"} color={"#666666"}
                          fontSize={"0.95em"} lineHeight={"1.5em"} isDismissible={true} margin={"20px 0px 0px 0px"}>
                          Tips:
                          <ul  className="list-disc pl-5">
                            <li>When taking photos, please keep the sign straight in the photo.  We're adding some functionality to help with this too!</li>
                            <li>On mobile devices, you'll normally see an option to take a photo.  Please allow access to the camera when prompted by your browser.</li>
                          </ul>
                        </Message>

                        <br />
                        <Button onClick={() => setTab('1')} variation="primary" width={"16em"}>Let's get started...</Button>&nbsp;
                        </>
                )},

                //-------------------------------------------------------------
                // Tab 1
                // File selection tab
                //-------------------------------------------------------------

                { label: 'Select Photo', value: '1', 
                content: ( 
                  <>
                  <div className='percaaa'>
                      <ThemeProvider theme={dztheme}>
                          <DropZone 
                            acceptedFileTypes={['image/*']}
                            onDropComplete={({ acceptedFiles }) => {setFiles(acceptedFiles); }}
                            onDrop={clearMessagesAndLoad}
                            >

                          Please select an image by clicking the browse option below...

                          <br/>
                          <br/>
                          <Button width="10em" onClick={() => hiddenInput.current?.click()}>Browse</Button>
                          <VisuallyHidden>
                              <input
                              type="file"
                              tabIndex={-1}
                              ref={hiddenInput}
                              onChange={onFilePickerChange}
                              multiple={false}
                              accept={acceptedFileTypes.join(',')}
                              />
                          </VisuallyHidden>
                          </DropZone>
                      </ThemeProvider>

                  </div>
    
                  </>
                )},


                //-------------------------------------------------------------
                // Tab 2
                // File preview tab
                //-------------------------------------------------------------

                { label: 'Check Photo', value: '2', 
                    content: ( 
                    <>
                      <div className='perc5aaa0'>
                        {!hasFile && 
                          <>
                            <Message
                                variation="filled" colorTheme ="info" backgroundColor={"#f5faff"} color={"#666666"}
                                fontSize={"0.95em"} lineHeight={"1.5em"} isDismissible={true} margin={"10px 0px 0px 0px"}>
                                No image file selected.  Please click the 'Select Photo' tab above for options.
                            </Message>
                          </>
                        }

                        {hasFile && 
                        <>
                          {!uploading &&
                            <>
                            <Button isDisabled={uploading} onClick={HandleImageSubmit} variation="primary" width={"16em"}>Upload and Check Sign</Button>&nbsp;
                            <Button isDisabled={uploading} onClick={handleClearFiles} width={"16em"}>Select a new image</Button>
                            </>
                          }
                        </>
                        }
       
                        {uploading &&
                          <>
                          <Message
                            colorTheme ="info"
                            heading=""
                            hasIcon={false}
                            isDismissible={false}
                            backgroundColor={"#f5faff"}>
                            Checking your file... please wait...
                            </Message> 
                          </>
                        }

                        {uploading &&
                          <>
                            <ShowLoader /> 
                            <br />
                          </>
                        }

                        {!uploading && hasFile &&
                            <>
                              <Message
                                variation="filled"
                                colorTheme ="info"
                                heading=""
                                isDismissible={true}
                                backgroundColor={"#f5faff"}
                                color={"#666666"}
                                fontSize={"0.95em"}
                                lineHeight={"1.5em"}
                                margin={"20px 0px 0px 0px"}>
                                Please review your photo and click 'Upload and Check Sign' to see more information about this sign.  Please ensure the photo of the sign is square/straight 
                                within the photo (we're working on some functionality to help with this in a future release!).  If you need to take the photo again, click on 'Select a new image'.
                              </Message>
                          </>
                          }

                          <Divider size="small" orientation="horizontal" margin={'20px 0px 20px 0px'} />

                            <Flex
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="stretch"
                              alignContent="flex-start"
                              wrap="nowrap"
                              gap="1rem"
                            >
                              <View width="auto">
                              </View>
                              <View width="auto">

                              {hasFile && 
                                <>
                                <img
                                  ref={imgRef}
                                  src={imgSrc}
                                  width={"200"}
                                />

                                {files.map((file) => (
                                  <Message
                                    hasIcon={false}
                                    padding={'6px 12px 6px 12px'}
                                    backgroundColor="#f9fdff"
                                    key={file.name}
                                    borderRadius="small"
                                    border = "1px solid #d9dddf"
                                    maxWidth="max-content"
                                    margin={'0px 0px 3px 0px'}
                                  >
                                  {file.name}
                                  </Message>
                                ))}

                                </>
                              }
                              </View>
                            </Flex>
                      </div>
                    </>
                )},


                //-------------------------------------------------------------
                // Tab 3
                // Results tab
                //-------------------------------------------------------------

                { label: 'Sign Details', value: '3', 
                    content: ( 
                  <>
                  <div className='percaaa50'>
                    {!hasFile && 
                      <>
                        <Message
                            variation="filled" colorTheme ="info" backgroundColor={"#f5faff"} color={"#666666"}
                            fontSize={"0.95em"} lineHeight={"1.5em"} isDismissible={true} margin={"10px 0px 0px 0px"}>
                            No image file selected.  Please click the 'Select Photo' tab above for options..
                        </Message>
                      </>
                    }

                    {(hasFile && !(uploadMessage || warningMessage)) && 
                      <>
                        <Message
                            variation="filled" colorTheme ="info" backgroundColor={"#f5faff"} color={"#666666"}
                            fontSize={"0.95em"} lineHeight={"1.5em"} isDismissible={true} margin={"10px 0px 20px 0px"}>
                            No image file yet uploaded.  Please click the 'Check Photo' tab above to review and upload your photo.
                        </Message>
                      </>
                    }

                    {hasFile && 
                      <>
                        <Button isDisabled={uploading} onClick={handleClearFiles}  variation="primary" width={"16em"}>Select a new image</Button>
                      </>
                    }

                    <Divider size="small" orientation="horizontal" margin={'20px 0px 20px 0px'} />

                    {uploadMessage && 
                      <>
                        <Message hasIcon={true} isDismissible={false} colorTheme="success" heading="Here's what we can tell you about this sign:">
                          <>
                            <ul className="list-disc pl-5" dangerouslySetInnerHTML={{ __html: uploadMessage }} />
                          </>
                        </Message>
                        <br />
                      </>
                    }
                  
                  {warningMessage && 
                      <>
                        <Message hasIcon={true} isDismissible={false} colorTheme="warning" heading="Warning - Please Note:">
                          <>
                            <ul className="list-disc pl-5" dangerouslySetInnerHTML={{ __html: warningMessage }} />
                          </>
                        </Message>
                        <br />
                      </>
                    }

                    {errorMessage && 
                      <>
                        <Message hasIcon={true} isDismissible={true} colorTheme="error" heading="We're having difficulty reading this sign">
                          {errorMessage}
                          </Message>
                      </>
                    }

                    {var3}<br />
                    {currentTime}
                  </div>
                  </>
                )}
            ]}
            />
            </ThemeProvider>
        );
    };
    

    
    // file reader for the file drop function beow
    // (designed to run async)
    const readFileAsDataURL = (file: File): Promise<string | ArrayBuffer | null> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    //-------------------------------------------------------------------------
    // alternate version for upload function
    //-------------------------------------------------------------------------

    const clearMessagesAndLoad = async () => {
      setUploadMessage('');
      setErrorMessage('');
      setUploading(false);
      setVar3('');
  
      if (files.length !== 0) 
        {
          setFiles([]); 
        }

      const file = files[0];
      try {
        const result = await readFileAsDataURL(file); // Wait for the file to be read

        if (typeof result === 'string') {
          setImgSrc(result); 
        }


        // Move to next tab after the file is processed
        setTab('2');
        setHasFile(true);
      } catch (error) {
        console.error("Error reading file:", error);
        setErrorMessage('Failed to read the file.');
      }
    };

    //-------------------------------------------------------------------------
    // clears the file selection and contents and resets messages
    //-------------------------------------------------------------------------

    const handleClearFiles = () => {
        setUploading(false);
        setHasFile(false);
        setUploadMessage('');
        setErrorMessage('');
        setTab('1')                      // move to first tab

        setImgSrc('');

        if (files.length !== 0) 
        {
          setFiles([]); 
          setUploadMessage('File Selection Cleared.');
          return;
        }
    };

  
    //-------------------------------------------------------------------------
    // handles the browse button and os file selection
    // note the file drop is done by the drop zone control itself
    //-------------------------------------------------------------------------

    const onFilePickerChange = (event: { target: { files: any; }; }) => {
        setUploadMessage('');
        setErrorMessage('');
        setWarningMessage('');

        const file = event.target.files?.[0];
        if (file) {
          // Create a FileReader to read the file as a data URL
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              // Set the data URL to state
              setImgSrc(reader.result as string);
            }
          };
          reader.readAsDataURL(file);

          // move to next tab
          setTab('2')
          setHasFile(true);
        }
    };



    //-------------------------------------------------------------------------
    // routine to handle the actual upload and api invocation
    //-------------------------------------------------------------------------
    const HandleImageSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setUploadMessage('');
        setErrorMessage('');
        setWarningMessage('');

        setUploading(true);
    
        // calls the AWS API and sends the image data as a base 64 string
        try {
             const response = await fetch('https://ug7jfdmytf.execute-api.ap-southeast-2.amazonaws.com/v1/parking_sign_rec_1', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ image: imgSrc })
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                setTab('3')                      // move to next tab
              throw new Error(`Network response was not ok: ${response.statusText}, ${errorText}`);
            }
    
            // display the data that has been returned from the server
            const jsonResponse = await response.json();
            const data = jsonResponse.body; 

            //setVar3(data)
  
            // clear the uploading status, regardless of outcome
            setUploading(false);

            const bodytext = JSON.parse(data)

            if (bodytext && bodytext.message) {
                setUploadMessage(bodytext.message);
                setCurrentTime(bodytext.currenttime);
                setTab('3')                      // move to next tab
            } else {
                setTab('3')                      // move to next tab
                setErrorMessage('Unable to interpret that sign.');
            }

            // display a warning message if needed (no standing, permit etc)
            if (bodytext && bodytext.warningmessage) {
              setWarningMessage(bodytext.warningmessage);
              setErrorMessage('');
            }

        // if error with API call
        } catch (error) {
          // move to tab 3 and clear messages
          setTab('3')                      
          setUploading(false);

          setErrorMessage('Unable to interpret that sign.  Please try again with a new photo of the sign.');
        }
      };
    
      
    //-------------------------------------------------------------------------
    // the basic HTML structure.  
    // Note the tabs have their own routine as above
    //-------------------------------------------------------------------------

    return (
          <div className="min-h-screen bg-white text-gray-800 overflow-auto font-sans">
            <main className="container mx-auto px-4 py-6 sm:py-8 md:py-10">
              <div>
                <Card columnStart="1" columnEnd="1" backgroundColor={"#ffffff"}>
                    <Heading level={3}>Can I Park Here?</Heading>
                </Card>

                <Card columnStart="1" columnEnd="1"  backgroundColor={"#ffffff"}>
                    <ControlledTabDisplay />
                </Card>
            </div>
          </main>
        </div>
    );
};

export default CanIParkHere;