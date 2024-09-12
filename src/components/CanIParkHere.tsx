import React, { useState, useRef  } from 'react';
import { Heading, Loader, Card, Button, Message, ThemeProvider, createTheme, DropZone, VisuallyHidden, Tabs} from '@aws-amplify/ui-react'; 
import '@aws-amplify/ui-react/styles.css';          // amplify react styling
import 'mapbox-gl/dist/mapbox-gl.css';              // for mapbox
import './extra.css';                               // own css styling

//{parkingWarning && <Message hasIcon={true} isDismissible={false} colorTheme="warning" heading="Note">{parkingWarning}</Message>}
//{parkingInformationOk && <Message hasIcon={true} isDismissible={false} colorTheme="success" heading="Parking Information">{parkingInformationOk}</Message>}


// determine file types to be processed.  Limit these typpng/jpg at this time
const acceptedFileTypes = ['image/png', 'image/jpeg'];

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


//-------------------------------------------------------------------------
// Main export routine for this screen
//-------------------------------------------------------------------------

export const CanIParkHere: React.FC = () => {
    const [files, setFiles] = useState([]);
    const [hasFile, setHasFile] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const hiddenInput = React.useRef<HTMLInputElement | null>(null);
    const [imgSrc, setImgSrc] = useState('')
    const imgRef = useRef<HTMLImageElement>(null)
    const [tab, setTab] = useState('1');

    // default lat and long - melbourne cbd
//    const [latitude, setLatitude] = useState(-37.8136);
//    const [longitude, setLongitude] = useState(145.9631);
//    const [latlongtext, setLatLongText] = useState('');
//    const [locationMessage, setLocationMessage] = useState('');


    // get location from user.  actually comes from browser and
    // depends on permissions (browser will prompt)
    // see the 'where am i?' tab details below for details on how this is invoked
//    const getUserGeolocation = () => {
//        if (navigator.geolocation) {
//            navigator.geolocation.getCurrentPosition(
//                (position) => {
//                    setLatitude(position.coords.latitude);
//                    setLongitude(position.coords.longitude);
//
//                    setLatLongText(latitude.toString() + "," + longitude.toString() )
//                },
//                () => {
//                    setLocationMessage('Could not obtain position details');
//                }
//            );
//        } else {
//            setLocationMessage('Browser is not providing position details');
//        }
//    };



    //    const [parkingInformationOk, setParkingInformationOk] = useState('');
    //    const [parkingWarning, setParkingWarning] = useState('');

    // placeholders FOR TESTING ONLY
    // don't name variables this way!
    const [var3, setVar3] = useState('');


    // diplays the loader that displays while the file is being processed
    const  ShowLoader= () => {
        return <Loader variation="linear" />;
    };


    //-------------------------------------------------------------------------
    // Tabs display - this has all the active  html content used for the
    // on this function.  It has it's own function here so we can 
    // programatically control the active tab
    //-------------------------------------------------------------------------

    const ControlledTabDisplay = () => {
        return (
            <Tabs value={tab} onValueChange={(tab) => setTab(tab)}  
            items={[
                // Tab 0
                // Map (and parking?)

//                { label: 'Where Am I?', value: '4', 
//                    content: ( 
//                      <>
//                        <Button size="small" onMouseDown={clearMessages} onClick={getUserGeolocation}>Locate Me!</Button>
//                        <br />
//                        {errorMessage && <Message hasIcon={true} isDismissible={true} colorTheme="error" heading="Error">{locationMessage}</Message>}
//                        <br />
//                        {latlongtext}
//                      </>
//                )},

                // Tab 1
                // File selection tab

                { label: 'Select Image File', value: '1', 
                content: ( 
                  <>
                  <div className='perc50'>
                      <ThemeProvider theme={dztheme}>
                          <DropZone 
                          acceptedFileTypes={['image/*']}
                          >
                          Drag image here or select by clicking the browse option below
                          <br/>
                          <br/>
                          <Button size="small" onMouseDown={clearMessages} onClick={() => hiddenInput.current?.click()}>Browse</Button>
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

                // Tab 2
                // File preview tab

                { label: 'Check Your File', value: '2', 
                    content: ( 
                    <>
                      <div className='perc50'>
                        {uploading ? <ShowLoader /> : <div></div>}
                        <br />
        
                        <Button onClick={HandleImageSubmit} variation="primary">Upload and Check Sign
                        </Button>&nbsp;
                        
                        <Button isDisabled={hasFile} onClick={handleClearFiles}>Clear Selection</Button>
                        <br/>
                        <br/>
        
                        <img
                        ref={imgRef}
                        src={imgSrc}
                        width={"200"}
                        />
                      </div>
                    </>
                )},

                // Tab 3
                // Results tab

                { label: 'Sign Information', value: '3', 
                    content: ( 
                  <>
                  <div className='perc50'>

                  {warningMessage && <Message hasIcon={true} isDismissible={true} colorTheme="warning" heading="Warning">
                      <div dangerouslySetInnerHTML={{ __html: warningMessage }} />
                    </Message>}

                    {uploadMessage && 
                    <Message hasIcon={true} isDismissible={true} colorTheme="success" heading="Here's what we can tell you about this sign:">
                      <div dangerouslySetInnerHTML={{ __html: uploadMessage }} />
                    </Message>}
                  
                    
                    {errorMessage && <Message hasIcon={true} isDismissible={true} colorTheme="error" heading="We're having difficulty reading this sign">
                       {errorMessage}
                    </Message>}

                    <br />
                    {var3}<br />
                    {currentTime}
                  </div>
                  </>
                )}
            ]}
            />
        );
    };
    

    //-------------------------------------------------------------------------
    // clear any messages and reset any other corresponding controls
    //-------------------------------------------------------------------------

    function clearMessages()
    {
        setUploadMessage('');
        setErrorMessage('');
        setUploading(false);
        setVar3('');
    }

    //-------------------------------------------------------------------------
    // clears the file selection and contents and resets messages
    //-------------------------------------------------------------------------

    const handleClearFiles = () => {
        setUploading(false);
        setHasFile(false);
        setUploadMessage('');
        setErrorMessage('');

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
  
            const bodytext = JSON.parse(data)

            if (bodytext && bodytext.message) {
                setUploadMessage(bodytext.message);
                setCurrentTime(bodytext.currenttime);
                setUploading(false);
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



        // error with API call
        } catch (error) {
          setTab('3')                      // move to next tab
          setErrorMessage('Unable to interpret that sign.  Please try again with a new photo of the sign.');
        }
      };
    
      
    // the basic HTML structure.  
    // Note the tabs have their own routine as above
    return (
        <div>
                <Card columnStart="1" columnEnd="1" backgroundColor={"#fcfcfc"}>
                    <Heading level={3}>Can I Park Here?</Heading>
                    Upload a photo of a parking sign for help and more information about that sign
                </Card>

                <Card columnStart="1" columnEnd="1"  backgroundColor={"#fcfcfc"}>
                    <ControlledTabDisplay />
                </Card>
        </div>
    );
};

export default CanIParkHere;