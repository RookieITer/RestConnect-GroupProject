import React, { useState, useRef  } from 'react';
import { Heading, Loader, Card, Button, Message, ThemeProvider, createTheme, DropZone, VisuallyHidden, Tabs, Grid} from '@aws-amplify/ui-react'; 
import '@aws-amplify/ui-react/styles.css';
import './extra.css';

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
    const [currentTime, setCurrentTime] = useState('');
    const hiddenInput = React.useRef<HTMLInputElement | null>(null);
    const [imgSrc, setImgSrc] = useState('')
    const imgRef = useRef<HTMLImageElement>(null)
    const [tab, setTab] = useState('1');

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

                // Tab 1
                // File selection tab

                { label: 'Select Image File', value: '1', 
                content: ( 
                  <>
                  <div className='perc99'>
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
                    </>
                )},

                // Tab 3
                // Results tab

                { label: 'Sign Information', value: '3', 
                    content: ( 
                  <>
                    {uploadMessage && 
                    <Message hasIcon={true} isDismissible={true} colorTheme="success" heading="Parking Sign Details">
                    <div dangerouslySetInnerHTML={{ __html: uploadMessage }} />
                    </Message>}
                   
                    {errorMessage && <Message hasIcon={true} isDismissible={true} colorTheme="error" heading="Error">{errorMessage}</Message>}

                    <br />
                    {var3}<br />
                    {currentTime}

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
              throw new Error(`Network response was not ok: ${response.statusText}, ${errorText}`);
            }
    
            // display the data that has been returned from the server
            const jsonResponse = await response.json();
            const data = jsonResponse.body; 
            setVar3(data)
  
            const bodytext = JSON.parse(data)

            if (bodytext && bodytext.message) {
                setUploadMessage(bodytext.message);
                setCurrentTime(bodytext.currenttime);
                setUploading(false);
                setTab('3')                      // move to next tab
            } else {
                setUploadMessage('No message found');
            }

        // error with API call
        } catch (error) {
          setErrorMessage('Failed to fetch data... Please try again. Error: ${error.message}');
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