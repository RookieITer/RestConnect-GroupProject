import React, { useState, useRef  } from 'react';
import { ToggleButton, ToggleButtonGroup, Badge, Heading, Image, Loader, Card, Button, Message, ThemeProvider, createTheme, Accordion, DropZone, VisuallyHidden, Tabs, Flex, View, Divider} from '@aws-amplify/ui-react'; 
import '@aws-amplify/ui-react/styles.css';          // amplify react styling
import 'mapbox-gl/dist/mapbox-gl.css';              // for mapbox
import '/src/components/extra.css';                 // for own styling
import sign from './sign.png';

// determine file types to be processed.  Limit these types jpg, png, gif, bmp at this time
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp', 'image/gif'];


//-----------------------------------------------------------------------------
// theming to use where needed for react elements
//-----------------------------------------------------------------------------

// theme to bypass the default theme used for the accordion menu.
const acctheme = createTheme({
  name: 'Accordion-theme',
  tokens: {
    components: {
      accordion: {
        backgroundColor: '#ffffff',
        item: {
          trigger: {
            color: '#333',
            backgroundColor: '#555555',
            _hover: {
              color: '#333333',
              backgroundColor: '#fafafa',
            },
          },
          content: {
            color: '#999999'
          },
        },
      },
    },
  },
});

// theme to bypass the default theme used for the accordion menu.
const toggleTheme = createTheme({
  name: 'Toggle-theme',
  tokens: {
    components: {
      togglebutton: {
        borderColor: { value: '{colors.blue.90}' },
        color: { value: '{colors.blue.90}' },
        _hover: {
          backgroundColor: { value: '{colors.green.10}' },
        },
        _focus: {
          color: { value: '#666666' },
        },
        _active: {
          backgroundColor: { value: '{colors.green.20}' },
        },
        _pressed: {
          backgroundColor: { value: '{colors.green.20}' },
          color: { value: '#666666' },
          _hover: {
            backgroundColor: { value: '{colors.green.10}' },
          },
        },
      },
    },
  },
});

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
            color: { value: '#dddddd' },
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
    const [messageHeading, setMessageHeading] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');
    const [warningHeading, setWarningHeading] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [signContent, setSignContent] = useState('');
    const [selectedDirection, setSelectedDirection] = useState('');
    //const [debug1, setDebug1] = useState('');
    const hiddenInput = React.useRef<HTMLInputElement | null>(null);
    const [imgSrc, setImgSrc] = useState('')
    const imgRef = useRef<HTMLImageElement>(null)
    const [tab, setTab] = useState('1');

    // controls display of each tab
    const [disabledTab1, setDisabledTab1] = useState(false);
    const [disabledTab2, setDisabledTab2] = useState(true);
    const [disabledTab3, setDisabledTab3] = useState(true);


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
                // Tab 1
                // File selection tab
                //-------------------------------------------------------------

                { label: 'Select Photo', value: '1', isDisabled: disabledTab1,
                content: ( 
                  <>
                    <div className='percaaa'>
                    <div className="pseudoheading">Which direction are you from the sign?</div>
                    <div className="fineprint">Click the buttons to select or de-select options</div>
                    <ThemeProvider theme={toggleTheme}>
                          <ToggleButtonGroup 
                            value= {selectedDirection}
                            isExclusive
                            onChange={(value) => setSelectedDirection(value as string)}
                          >                            
                            <ToggleButton height={"6em"} width={"6em"} value="Left">Left</ToggleButton>
                            &nbsp;&nbsp;&nbsp;
                            <Image
                              alt="A Parking Sign"
                              src={sign}
                              objectFit="initial"
                              backgroundColor="initial"
                              opacity="100%"
                            />
                            &nbsp;&nbsp;&nbsp;
                            <ToggleButton height={"6em"} width={"6em"} value="Right">Right</ToggleButton>
                          </ToggleButtonGroup>
                      </ThemeProvider>
                      <Divider size="small" orientation="horizontal" margin={'20px 0px 20px 0px'} />

                      <div className="pseudoheading">Select Your Image</div>
                      <div className="fineprint">Mobile devices will prompt you to take a photo</div>
                      <Button className = 'btnmax' isDisabled = {(selectedDirection == null)}  variation="primary"onClick={() => hiddenInput.current?.click()}>Browse</Button>
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

                      <Divider size="small" orientation="horizontal" margin={'20px 0px 20px 0px'} />

                      <div className="pseudoheading">Other Vehicle Options</div>

                      <ThemeProvider theme={toggleTheme}>
                          <div className="fineprint">Click the buttons to select or un-select options</div>
                          <ToggleButton height={"4em"} className = 'btnmax'>Vehicle is a truck or van</ToggleButton>&nbsp;
                          <ToggleButton height={"4em"} className = 'btnmax'>Disabled permit is displayed</ToggleButton>&nbsp;
                          <Divider size="small" orientation="horizontal" margin={'30px 0px 20px 0px'} />
                      </ThemeProvider>

                    </div>
                  </>
                )},


                //-------------------------------------------------------------
                // Tab 2
                // File preview tab
                //-------------------------------------------------------------

                { label: 'Check Photo', value: '2', isDisabled: disabledTab2,  
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
                            <Button className = 'btnmax' isDisabled={uploading} onClick={HandleImageSubmit} variation="primary">Upload and Check Sign</Button>&nbsp;
                            <Button className = 'btnmax' isDisabled={uploading} onClick={handleClearFiles}>Select a new image</Button>
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
                                within the photo.  If you need to take the photo again, click on 'Select a new image'.
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

                { label: 'Sign Details', value: '3', isDisabled: disabledTab3, 
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
                        <Button className = 'btnmax' isDisabled={uploading} onClick={handleClearFiles}  variation="primary">Select a new image</Button>
                      </>
                    }

                    <Divider size="small" orientation="horizontal" margin={'20px 0px 20px 0px'} />

                    {uploadMessage && 
                      <>
                        <Message hasIcon={true} isDismissible={false} colorTheme="success" heading={messageHeading}>
                          <>
                            <ul className="list-disc pl-5" dangerouslySetInnerHTML={{ __html: uploadMessage }} />
                          </>
                          <Badge maxWidth={"25em"} textAlign={"center"} border="1px" borderColor={"#333333"} variation="info">Parking here is free</Badge>
                        </Message>
                        <br />

                        <ThemeProvider theme={acctheme}>
                         <Accordion 
                          items={[
                            {
                              trigger: 'All Sign Information',
                              value: 'sign2',
                              content: <Message variation="plain" colorTheme="neutral">{signContent}</Message>
                            },
                            {
                              trigger: 'All Sign Information2',
                              value: 'sign3',
                              content: <Message variation="plain" colorTheme="neutral">aaa<br />bbb</Message>
                            },
                          ]}
                          />
                        </ThemeProvider>
                      </>
                    }
                  
                  {warningMessage && 
                      <>
                        <Message hasIcon={true} isDismissible={false} colorTheme="warning" heading={warningHeading}>
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
                  </div>
                  </>
                )}
            ]}
            />
            </ThemeProvider>
        );
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
        setDisabledTab1(false);
        setDisabledTab2(true);
        setDisabledTab3(true);

        setImgSrc('');

        if (files.length !== 0) 
        {
          setFiles([]); 
          setUploadMessage('File Selection Cleared.');
          return;
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
                setDisabledTab2(false);
                throw new Error(`Network response was not ok: ${response.statusText}, ${errorText}`);
            }
    
            // display the data that has been returned from the server
            const jsonResponse = await response.json();
            const data = jsonResponse.body; 
 
            // clear the uploading status, regardless of outcome
            setUploading(false);

            const bodytext = JSON.parse(data);
            var oktopark = false;
            var notoktopark = false;
            var park_message = "";
            var warn_message = "";
            var all_sign_info = "";

            // check all the returned items
            if (bodytext && bodytext.items) {
              //setDebug1(bodytext.items[0].direction);
              for (let idx = 0; idx < bodytext.items.length; idx++) 
              {
                setTab('3')                      // move to next tab
                setDisabledTab3(false);
      
                // build up all sign info list for full display option
                all_sign_info += "Sign Type: " + bodytext.items[idx].category
                all_sign_info += "<br />"

                if (bodytext.items[idx].isnow === true)
                {
                  if  (bodytext.items[idx].noparking === false)
                  {
                    oktopark = true;
                    setMessageHeading("Yes, you can park here:");
                    setSignContent("Hi");
                    park_message += "For up to " + bodytext.items[idx].hours + " hours";
                    park_message += "<br />Up until " + bodytext.items[idx].totime;

                    if  (bodytext.items[idx].metered === true)
                    {
                      park_message += "<br />Parking here requires you to pay for parking";
                    }
                    else
                    {
                      park_message += "<br />Parking here is free - no payment is required";
                    }

                    setUploadMessage(park_message);
                    oktopark = true;
                  }
                  else
                  {
                    notoktopark = true;
                    warn_message = "There is a no parking or no standing zone indicated on this sign";
                    if (bodytext.items[idx].direction == 'LEFT' || bodytext.items[idx].direction == 'RIGHT')
                    {
                      warn_message += "<br />You cannot park to the ";
                      warn_message += bodytext.items[idx].direction.toLowerCase();
                      warn_message += " hand side of the sign";

                    }

                    setWarningHeading("Warning about this parking spot");
                    setWarningMessage(warn_message);
                  }
                }
              }

              // display our full list
              setSignContent(all_sign_info);
           
            
            } else {
              //
            }

            if (notoktopark === false && oktopark === false)
            {
              setMessageHeading("Yes, you can park here");
              setUploadMessage("The day and time are currently outside of any restrictions indicated on the sign.");
            }




//              if (bodytext && bodytext.message) {
 //               setUploadMessage(bodytext.message);
 //               setTab('3')                      // move to next tab
  //              setDisabledTab3(false);
  //            } else {
  //              setTab('3')                      // move to next tab
  //              setErrorMessage('Unable to interpret that sign.');
  //              setDisabledTab3(false);
  //            }

            // display a warning message if needed (no standing, permit etc)
//            if (bodytext && bodytext.warningmessage) {
//              setWarningMessage(bodytext.warningmessage);
//              setErrorMessage('');
//            }

        // if error with API call
        } catch (error) {
          // move to tab 3 and clear messages
          setTab('3')                      
          setDisabledTab3(false);
          setUploading(false);

          setErrorMessage('Unable to interpret that sign.  Please try again with a new photo of the sign.');
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
        // create filereader to get image data as URL type format
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            // set the image source based on the content from above
            setImgSrc(reader.result as string);
          }
        };
        reader.readAsDataURL(file);

        // move to next tab
        setTab('2')
        setDisabledTab2(false);
        setHasFile(true);
      }
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


    // diplays the loader that displays while the file is being processed

    const  ShowLoader= () => {
      return <Loader variation="linear" />;
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

                    <br />
                    <Heading level={4}>Tips</Heading>
                    <br />

                    <ThemeProvider theme={acctheme}>
                      <Accordion 
                        items={[
                          {
                            trigger: 'Tips on taking photos',
                            value: 'styling1',
                            content: 'When taking photos of the signs, please try to keep the sign square within your photo. We are working on some functionality to help with this too.'
                          },
                          {
                            trigger: 'Tips for mobile devices',
                            value: 'styling2',
                            content: 'On mobile devices, you may be prompted to allow the website to have access to your camera. Please allow this for the best experience. Having this option available allows the system to prompt you to take a photo directly from the application.'
                          },
                          {
                            trigger: 'What type of vehicles does this cover?',
                            value: 'styling3',
                            content: 'Only signs relating to cars and vans are covered.  Some signs (such as No Standing and Clearway) may be applicable to other vehicles.'
                          }
                        ]}
                      />
                    </ThemeProvider>

                </Card>
            </div>
          </main>
        </div>
    );
};

export default CanIParkHere;