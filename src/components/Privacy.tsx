import React from 'react';
import { Heading, Card} from '@aws-amplify/ui-react'; 
import '@aws-amplify/ui-react/styles.css';          // amplify react styling
import 'mapbox-gl/dist/mapbox-gl.css';              // for mapbox
import '/src/components/extra.css';                 // for own styling

export const Privacy: React.FC = () => {
    //-------------------------------------------------------------------------
    // the basic HTML structure.  
    // Note the tabs have their own routine as above
    //-------------------------------------------------------------------------

    return (
          <div className="min-h-screen bg-white text-gray-800 overflow-auto font-sans">
            <main className="container mx-auto px-4 py-6 sm:py-8 md:py-10">
              <div>
                <Card columnStart="1" columnEnd="1" backgroundColor={"#ffffff"} padding={"0px 0px 3px 15px"}>
                    <Heading level={3}>Privacy Policy</Heading>
                </Card>

                <Card columnStart="1" columnEnd="1"  backgroundColor={"#ffffff"}>
                  We are committed to providing quality services to you and this policy outlines our ongoing obligations to you in respect of how we manage Personal Information.
                  We have adopted the Australian Privacy Principles (APPs) contained in the Privacy Act 1988 (Cth) (the Privacy Act). The NPPs govern the way in which we collect, use, disclose, store, secure and dispose of Personal Information.
                  A copy of the Australian Privacy Principles may be obtained from the website of The Office of the Australian Information Commissioner at https://www.oaic.gov.au/.
                  <br /><br />
                  <b>What is Personal Information?</b><br />
                  Personal Information is information or an opinion that identifies an individual. Examples of Personal Information that some organisations might collect includes names, addresses, email addresses, phone and facsimile numbers.
                  <br /><br />
                  <b>Do we collect Personal Information?</b><br />
                  No.  We do not collect or store your Personal Information for any reason.  
                  <br /><br />
                  <b>Sensitive Information</b><br />
                  Sensitive information is defined in the Privacy Act to include information or opinion about such things as an individual's racial or ethnic origin, political opinions, membership of a political association, religious or philosophical beliefs, membership of a trade union or other professional body, criminal record or health information.
                  <br /><br />
                  <b>Do we collect Sensitive Information?</b><br />
                  No.  We do not collect or store personal Sensitive Information for any reason.  
                  <br /><br />
                  <b>Third Parties</b><br />
                  While we may use services from 3rd parties to provide functionality related to our services, we do not receive or exchange any personal information from those services.  
                  <br /><br />
                  <b>Access to your Personal Information</b><br />
                  We do not capture or store any personal information or sensitive information relating to users of our services. 
                  <br /><br />
                  <b>Policy Updates</b><br />
                  This Policy may change from time to time and is available on our website.
                  <br /><br />
                  <b>Privacy Policy Complaints and Enquiries</b><br />
                  If you have any queries or complaints about our Privacy Policy please contact us at ccol0021@student.monash.edu
                </Card>
            </div>
          </main>
        </div>
    );
};

export default Privacy;