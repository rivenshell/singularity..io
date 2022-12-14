import React, { useState } from 'react';
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import {
    Card, CardContent, FormControl, FormHelperText,
    InputLabel, MenuItem, Select, Typography
} from "@material-ui/core";
import { callDalleService } from "./backend_api";
import GeneratedImageList from "./GeneratedImageList";
import TextPromptInput from "./TextPromptInput";
import "./App.css";
import BackendUrlInput from "./BackendUrlInput";
import LoadingSpinner from "./LoadingSpinner";
import NotificationCheckbox from './NotificationCheckbox';
import title from "../src/img/google.jpg"
import robot from "../src/img/robot-dancing.jpg";
import bear from "../src/img/teddy-bear.jpg";
import mars from "../src/img/apocaliptic-mars.jpg";
import "./styles/example-pics.css";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { app } from './firebase/FirebaseConfig'



const useStyles = () => ({
    root: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        margin: '60px 0px 60px 0px',
        alignItems: 'center',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
    },
    playgroundSection: {
        display: 'flex',
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: '20px',
    },
    settingsSection: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1em',
        maxWidth: '300px',
    },
    searchQueryCard: {
        marginBottom: '20px'
    },
    imagesPerQueryControl: {
        marginTop: '20px',
    },
    formControl: {
        margin: "20px",
        minWidth: 120,
    },
    gallery: {
        display: 'flex',
        flex: '1',
        maxWidth: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '1rem',
    },
});

const NOTIFICATION_ICON = "https://camo.githubusercontent.com/95d3eed25e464b300d56e93644a26c8236a19e04572cf83a95c9d68f8126be83/68747470733a2f2f656d6f6a6970656469612d75732e73332e6475616c737461636b2e75732d776573742d312e616d617a6f6e6177732e636f6d2f7468756d62732f3234302f6170706c652f3238352f776f6d616e2d6172746973745f31663436392d323030642d31663361382e706e67";

const App = ({ classes }) => {

    const [userLogged, setUserLogged] = useState();
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user)=>{
    if (user){
    //   console.log(user)
      setUserLogged(user)
    }
  })
  console.log("srtdrt",userLogged)

    const [backendUrl, setBackendUrl] = useState('');
    const [promptText, setPromptText] = useState('');
    const [isFetchingImgs, setIsFetchingImgs] = useState(false);
    const [isCheckingBackendEndpoint, setIsCheckingBackendEndpoint] = useState(false);
    const [isValidBackendEndpoint, setIsValidBackendEndpoint] = useState(true);
    const [notificationsOn, setNotificationsOn] = useState(false);

    const [generatedImages, setGeneratedImages] = useState([]);
    const [generatedImagesFormat, setGeneratedImagesFormat] = useState('jpeg');

    const [apiError, setApiError] = useState('')
    const [imagesPerQuery, setImagesPerQuery] = useState(2);
    const [queryTime, setQueryTime] = useState(0);

    const imagesPerQueryOptions = 10
    const validBackendUrl = isValidBackendEndpoint && backendUrl

    function enterPressedCallback(promptText) {
        console.log('API call to DALL-E web service with the following prompt [' + promptText + ']');
        setApiError('')
        setIsFetchingImgs(true)
        callDalleService(backendUrl, promptText, imagesPerQuery).then((response) => {
            setQueryTime(response['executionTime'])
            setGeneratedImages(response['serverResponse']['generatedImgs'])
            setGeneratedImagesFormat(response['serverResponse']['generatedImgsFormat'])
            setIsFetchingImgs(false)

            if (notificationsOn) {
                new Notification(
                    "Your DALL-E images are ready!",
                    {
                        body: `Your generations for "${promptText}" are ready to view`,
                        icon: NOTIFICATION_ICON,
                    },
                )
            }
        }).catch((error) => {
            console.log('Error querying DALL-E service.', error)
            if (error.message === 'Timeout') {
                setApiError('Timeout querying DALL-E service (>1min). Consider reducing the images per query or use a stronger backend.')
            } else {
                setApiError('Error querying DALL-E service. Check your backend server logs.')
            }
            setIsFetchingImgs(false)
        })
    }

    // Lets do this

    function getGalleryContent() {
        if (apiError) {
            return <Typography variant="h5" color="error">{apiError}</Typography>
        }

        if (isFetchingImgs) {
            return <LoadingSpinner isLoading={isFetchingImgs} />
        }

        return <GeneratedImageList generatedImages={generatedImages} generatedImagesFormat={generatedImagesFormat} promptText={promptText} />
    }


    return (
       
       <div className={classes.root}>
             <Link to="/aboutus">
						<button className="btn about">About us</button>
					</Link>
            <div className={classes.title}>

                <img className="cover" src={title} />
            </div>
            {/* Searchbar here */}
            <div id='input-box' class="input-group mb-3">
                 <input id='input-box1' type="text" class="form-control" placeholder="Search Billions of AI Generated Images" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
            </div>

            <div className='container-fluid'>
            <div className='row'>
                <div className="col-lg-4 col-md-4 img-wrapper">
                    <img className="img-fluid" src={bear}/>
                    <div className="img-info">
                        <p>A photo of a teddy bear on a skateboard in Times Square</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 img-wrapper">
                    <img className="img-fluid" src={mars} />
                    <div className="img-info">
                        <p>Apocaliptic future in Mars</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 img-wrapper">
                    <img className="img-fluid" src={robot}/>
                    <div className="img-info">
                        <p>A futuristic robot dancing in front of a mountain</p>
                    </div>
                </div>
            </div>
            </div>
            
    </div>
    )
}

export default withStyles(useStyles)(App);
