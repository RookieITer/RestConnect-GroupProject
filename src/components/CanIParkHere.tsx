import React, { useState, useRef  } from 'react';
import { Heading, Card, Button, Message, ThemeProvider, createTheme, DropZone, VisuallyHidden, Grid} from '@aws-amplify/ui-react'; 
import '@aws-amplify/ui-react/styles.css';
import './extra.css';

// determine file types to be processed.  Limit these typpng/jpg at this time
const acceptedFileTypes = ['image/png', 'image/jpeg'];

// theme to bypass the default theme used fot eh drop zone.
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



export const CanIParkHere: React.FC = () => {
    const [files, setFiles] = useState([]);
    const [hasFile, setHasFile] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [parkingInformationOk, setParkingInformationOk] = useState('');
    const [parkingWarning, setParkingWarning] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const hiddenInput = React.useRef<HTMLInputElement | null>(null);
    const [imgSrc, setImgSrc] = useState('')
    const imgRef = useRef<HTMLImageElement>(null)

    // placeholders FOR TESTING ONLY
    // don't name variables this way!
    const [var1, setVar1] = useState('');
    const [var2, setVar2] = useState('');
    const [var3, setVar3] = useState('');

    function clearMessages()
    {
        setUploadMessage('');
        setErrorMessage('');
    }

    // clears the file selection and contents and resets messages
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

    // handles the upload process (upload button)
    const HandleImageSubmit2 = async () => {
        setUploading(true);
        setUploadMessage('');
        setErrorMessage('');

        if (files.length === 0) 
        {
        setErrorMessage('Please select files to upload.');
        setUploading(false);
        return;
        }

        try {
            const uploadPromises = files.map(async (file) => 
            {
                // new routine to post base 64 data via api
                const result = file;
                return result;
            });

            const results = await Promise.all(uploadPromises);
            setUploadMessage('Files uploaded successfully.');
            console.log('Files uploaded successfully..', results);
            setFiles([]); 
            } 
            catch (error) 
            {
            setErrorMessage('Error uploading files');
            setUploadMessage('Error uploading files');
            setFiles([]);
            } 
            finally 
            {
            setHasFile(false);
            setUploading(false);
            }
    };


    // handles the browse button and os file selection
    // note the file drop is done by the drop zone control itself
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
        }
    };

    // alternate version of the above to handle the file drop process
    // which has slightly different arguments
    const onFileDrop = (acceptedFiles: File[]) => {
        setUploadMessage('');
        setErrorMessage('');

        const file = acceptedFiles[0];
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
        }
      };


      // routine to handle the actual upload and api invocation
      const HandleImageSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        setUploadMessage('');
        setErrorMessage('');
        //setVar2("ok2")
    
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
    
//            setVar1("ok1")
            const jsonResponse = await response.json();
            const data = jsonResponse.body; // No need to parse again if already an object
            setVar3(data)
            
            if (data && data.hours) {
                setUploadMessage(data.hours);
              } else {
                setUploadMessage('No message found');
              }

        } catch (error) {
          setErrorMessage('Failed to fetch data... Please try again. Error: ${error.message}');
        }
      };
    
      
    return (
        <div>

            <Grid columnGap="0.5rem" rowGap="0.5rem" templateColumns="1fr 1fr">

                {/* --------------------------------- */}
                {/* ---------- Header Card ---------- */}
                {/* --------------------------------- */}

                <Card columnStart="1" columnEnd="-1" backgroundColor={"#fcfcfc"}>
                    <Heading level={3}>Can I Park Here?</Heading>
                    Upload a photo of a parking sign for help and more information about that sign
                </Card>

                {/* --------------------------------- */}
                {/* ---------- Search Card ---------- */}
                {/* --------------------------------- */}

                <Card columnStart="1" columnEnd="1"  backgroundColor={"#fcfcfc"}>
                    <Heading level={4}>Step 1 - Locate Your Image</Heading>
                    <br/>

                    <div className='perc99'>
                        <ThemeProvider theme={dztheme}>
                            <DropZone 
                            acceptedFileTypes={['image/*']}
                            onDrop={onFileDrop}
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
            </Card>


            {/* ----------------------------------------------------------- */}
            {/* -------- Image/Text Results (Right Hand Side) Card -------- */}
            {/* ----------------------------------------------------------- */}

            <Card columnStart="2" columnEnd="2" rowSpan="3" backgroundColor={"#fcfcfc"}>
                <Heading level={4}>Results - More Information About The Sign</Heading>
                <br />

                <div className='perc99'>
                    {parkingWarning && <Message hasIcon={true} isDismissible={false} colorTheme="warning" heading="Note">{parkingWarning}</Message>}
                    {parkingInformationOk && <Message hasIcon={true} isDismissible={false} colorTheme="success" heading="Parking Information">{parkingInformationOk}</Message>}

                    {uploadMessage && <Message hasIcon={true} isDismissible={true} colorTheme="success" heading="Success">{uploadMessage}</Message>}
                    {errorMessage && <Message hasIcon={true} isDismissible={true} colorTheme="error" heading="Error">{errorMessage}</Message>}
                </div>

                <br />
                {var1}<br />
                {var2}<br />
                {var3}<br />

                {currentTime}
            </Card>


            <Card columnStart="1" columnEnd="1" backgroundColor={"#fcfcfc"}>
                <Heading level={4}>Step 2 - Preview Your Image</Heading>
                Upload a photo of a parking sign for help and more information about that sign
                <br/>

                <img
                ref={imgRef}
                src={imgSrc}
                width={"200"}
                />
            </Card>

            <Card columnStart="1" columnEnd="1" backgroundColor={"#fcfcfc"}>
                <Heading level={4}>Step 3 - Upload Image To Check Details</Heading>
                <br/>
    
                <Button onClick={HandleImageSubmit} variation="primary">
                    {uploading ? 'Uploading...' : 'Upload and Check Sign'}
                </Button>&nbsp;
                
                <Button isDisabled={hasFile} onClick={handleClearFiles}>Clear Selection</Button>
            </Card>

        </Grid>
        </div>
    );
};

export default CanIParkHere;