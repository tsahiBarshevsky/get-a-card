import React, { useState, useEffect } from 'react';
import { 
    Typography, Button, Input, Checkbox, FormControlLabel, InputLabel,
    FormControl, Select, MenuItem, InputAdornment, makeStyles, 
    createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { red, green } from '@material-ui/core/colors';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import { SocialLinks } from 'social-links';
import firebase from '../firebase';
import { withRouter } from 'react-router';
import Palette from './palette';
import ScrollToTop from '../scrollToTop';

const styles = makeStyles({
	select:
    {
        width: 130,
		borderRadius: 5,
        height: 40,
        paddingLeft: 10,
        marginBottom: 25,
        color: 'black',
		border: '1px solid #c0c0c0',
		backgroundColor: 'transparent',
        fontFamily: '"Nunito", sans-serif'
    },
    label:
    {
        paddingLeft: 10,
        paddingTop: 3
    },
    input:
	{
        borderRadius: 5,
        minHeight: 45,
		color: 'black',
		border: '1px solid #c0c0c0',
		backgroundColor: 'transparent',
		fontFamily: '"Nunito", sans-serif',
	},
    button:
    {
        height: 45,
        width: 175,
        bordeRadius: 5,
        fontSize: 15,
        color: 'white',
        marginRight: 15,
        textTransform: 'capitalize',
        '@media (max-width: 500px)':
        {
            marginRight: 0,
            marginBottom: 15
        }
    }
});

const theme = createMuiTheme({
    typography:
    {
        allVariants: { fontFamily: `"Nunito", sans-serif` },
        h5: { textDecoration: 'underline', fontWeight: 600, marginBottom: 20 },
        h6: { fontWeight: 600, marginBottom: 15 },
        subtitle1: { fontWeight: 600 },
        subtitle2: { fontWeight: 600 },
        caption: { fontSize: 16, fontWeight: 600, marginBottom: 20 },
        overline: { fontSize: 15, fontWeight: 600, textTransform: 'capitalize' }
    }
});

function AddCard(props) 
{
    const currentUser = firebase.getCurrentUsername();
    const socialLinks = new SocialLinks();
    const classes = styles();
    const [URL, setURL] = useState('');
    const [urlConfirm, setUrlConfirm] = useState(false);
    const [palette, setPalette] = useState({name: 'Default palette', primary: '#dcdde1', secondary: '#273c75', text: '#353b48'});
    const [langauge, setLanguage] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [wazeButton, setWazeButton] = useState(false);
    const [images, setImages] = useState({
        main: '',
        cover: ''
    });
    const [gallery, setGallery] = useState(false);
    const [contact, setContact] = useState([
        { id: 0, type: "Telephone", show: false, value: '' },
        { id: 1, type: "Phone", show: false, value: '' },
        { id: 2, type: "WhatsApp", show: false, value: '' },
        { id: 3, type: "Telegram", show: false, value: '' },
        { id: 4, type: "Email", show: false, value: '' }
    ]);
    const [socials, setSocials] = useState([
        { id: 0, name: 'Facebook', show: false, link: '' },
        { id: 1, name: 'Instagram', show: false, link: '' },
        { id: 2, name: 'Linkedin', show: false, link: '' },
        { id: 3, name: 'Github', show: false, link: '' },
        { id: 4, name: 'Pinterest', show: false, link: '' },
        { id: 5, name: 'Youtube', show: false, link: '' },
        { id: 6, name: 'Tiktok', show: false, link: '' },
        { id: 7, name: 'Dribbble', show: false, link: '' },
        { id: 8, name: 'Website', show: false, link: ''}
    ]);
    const palettes = [
        {name: 'Default palette', primary: '#dcdde1', secondary: '#273c75', text: '#353b48'},
        {name: 'Dark palette',primary: '#18191a', secondary: '#3a3b3c', text: '#e4e6eb'},
        {name: 'Freshy palette', primary: '#334443', secondary: '#34656d', text: '#ffffff'},
        {name: 'Pastel palette', primary: '#435560', secondary: '#6e7c7c', text: '#ffffff'}
    ];
    const regex = { 
        url: /^[A-Za-z][A-Za-z0-9]*$/,
        telephone: /02|03|04|08|09[0-9]{7}/,
        phone: /050|051|052|053|054|055|058[0-9]{7}/,
        whatsapp: /972(50|51|52|53|54|55|58)[0-9]{7}/,
        telegram: /.*?\B\w{5,64}\b.*/gm,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        website: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    };

    useEffect(() => {
        document.title = 'Add new card | Get a Card ';
    }, []);

    //protect the route
    if (!currentUser) {
        props.history.replace('/login');
        return null;
    }

    const notify = (type, message) =>
    {
        switch (type)
        {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            default: return null;
        }
    }

    const handleChange = (index, source) =>
    {
        var items;
        source === 'contact' ? items = [...contact] : items = [...socials];
        var item = {...items[index]};
        item.show = !item.show;
        items[index] = item;
        source === 'contact' ? setContact(items) : setSocials(items);
    }

    const handleInputsChange = (index, value, source) =>
    {
        var items;
        source === 'contact' ? items = [...contact] : items = [...socials];
        var item = {...items[index]};
        source === 'contact' ? item.value = value : item.link = value;
        items[index] = item;
        source === 'contact' ? setContact(items) : setSocials(items);
    }

    const handlePaletteChange = (palette) =>
    {
        switch (palette)
        {
            case 'Default palette':
                setPalette({name: 'Default palette', primary: '#dcdde1', secondary: '#273c75', text: '#353b48'})
                notify('success', 'Default palette selected');
                break;
            case 'Dark palette':
                setPalette({name: 'Dark palette', primary: '#18191a', secondary: '#3a3b3c', text: '#e4e6eb'})
                notify('success', 'Dark palette selected');
                break;
            case 'Freshy palette':
                setPalette({name: 'Freshy palette', primary: '#334443', secondary: '#34656d', text: '#ffffff'});
                notify('success', 'Freshy palette selected');
                break;
            case 'Pastel palette':
                setPalette({name: 'Pastel palette', primary: '#435560', secondary: '#6e7c7c', text: '#ffffff'});
                notify('success', 'Pastel palette selected');
                break;
            default: return null;
        }
    }

    const checkURLAvailability = (url) =>
    {
        fetch(`https://get-a-card.herokuapp.com/URL-availability?URL=${url}`)
        .then(res => res.json())
        .then(result => 
        {
            if (result)
            {
                notify('success', 'URL is available');
                setUrlConfirm(true);
            }
            else
            {
                notify('error', "URL isn't available");
                setUrlConfirm(false);
            }
        });
    }

    const uploadMainImage = (e) =>
	{
		if (e.target.files[0])
		{
			try 
			{	
				if (e.target.files[0].size < 10000000) //less then 10mb
				{
                    notify("success", "Upload has started");
					const uploadTask = firebase.storage.ref(`${currentUser}/${URL}/main`).put(e.target.files[0]);
					uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            console.log(progress);
                        },
                        (error) => {
                            console.log(error);
                            alert(error.message);
                        },
                        () => {
                            firebase.storage.ref(`${currentUser}/${URL}`).child('main').getDownloadURL().then(
                                url => setImages({ ...images, main: url })
                            ).then(notify("success", "Main image uploaded successfully!"));;
                        }
                    );
				}
				else
				{
					notify("error", "Image's size is bigger than 10mb!");
				}
			} 
			catch (error) 
			{
                notify('error', 'error');
				console.log(error.message);
			}
		}
	}

    const uploadCoverImage = (e) =>
	{
		if (e.target.files[0])
		{
			try 
			{	
				if (e.target.files[0].size < 10000000) //less then 10mb
				{
                    notify("success", "Upload has started");
					const uploadTask = firebase.storage.ref(`${currentUser}/${URL}/cover`).put(e.target.files[0]);
					uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            console.log(progress);
                        },
                        (error) => {
                            console.log(error);
                            alert(error.message);
                        },
                        () => {
                            firebase.storage.ref(`${currentUser}/${URL}`).child('cover').getDownloadURL().then(
                                url => setImages({ ...images, cover: url })
                            ).then(notify("success", "Cover image uploaded successfully!"));
                        }
                    );
				}
				else
				{
					notify("error", "Image's size is bigger than 10mb!");
				}
			} 
			catch (error) 
			{
                notify('error', 'error');
				console.log(error.message);
			}
		}
	}

    const uploadGalleryIamges = (e) =>
	{
		if (e.target.files)
		{
			try 
			{	
                notify("success", `Upload has started`);
                for (var i=0; i<e.target.files.length; i++)
                {
                    if (e.target.files[i].size < 5000000) //less then 5mb
                    {
                        const uploadTask = firebase.storage.ref(`${currentUser}/${URL}/gallery/${i}`).put(e.target.files[i]);
                        uploadTask.on(
                            'state_changed',
                            (snapshot) => {
                                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                                console.log(progress);
                            },
                            (error) => {
                                console.log(error);
                                alert(error.message);
                            }
                        );
                    }
                    else
                    {
                        notify("error", "One of the images' size is bigger than 10mb!");
                    }
                }
			} 
			catch (error) 
			{
                notify('error', 'error');
				console.log(error.message);
			}
		}
	}

    async function submitCard()
    {
        if (name !== '' && type !== '' && description !== '')
        {
            var link;
            if (wazeButton)
            {
                const response = await fetch(`/waze-link?address=${address}`);
                link = await response.json();
            }
            else
                link = 'none';
            fetch(`https://get-a-card.herokuapp.com/insert-new-card`, 
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        owner: currentUser,
                        URL: URL,
                        palette: palette,
                        langauge: langauge,
                        name: name,
                        type: type,
                        description: description,
                        address: address,
                        waze: link,
                        contact: contact,
                        socials: socials,
                        images: images,
                        gallery: gallery
                    })
                }    
            )
            .then(res => res.json())
            .then(res => 
            {
                notify("success", res);
                setTimeout(() => {
                    props.history.replace('/dashboard');
                }, 5500);
            });
        }
        else
            notify("error", 'Name, type or description has left blank');
    }

    return (
        <div className="page-container">
            <div className="add-card-container">
                <ScrollToTop />
                <MuiThemeProvider theme={theme}>
                    <section id="url-selection">
                        <Typography variant="h5">Choose URL</Typography>
                        <Typography variant="caption">
                            The URL is used to identify your digital business card. <br />
                            It have to be one word that start with an English letter 
                            (uppercase or lowercase) and can contain numbers.
                        </Typography>
                        <div className="input">
                            <Input
                                id="URL"
                                placeholder="URL..."
                                autoComplete="off"
                                value={URL} 
                                className={classes.input}
                                disableUnderline
                                style={{ marginRight: 5 }}
                                inputProps={{ style: { marginLeft: 15 } }}
                                endAdornment=
                                {
                                    regex.url.test(URL) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                onChange={(e) => setURL(e.target.value)} />
                            <Button     
                                disabled={!regex.url.test(URL)} 
                                style={regex.url.test(URL) ? {backgroundColor: '#0a71e7'} : null}
                                variant="contained" 
                                className="button"
                                onClick={() => checkURLAvailability(URL)}>Check Availability</Button>
                        </div>
                    </section>
                    <section id="palette-selection" style={!urlConfirm ? {pointerEvents: 'none'} : null}>
                        <Typography variant="h5">Card design</Typography>
                        <Typography variant="h6">Choose color palette</Typography>
                        <div className="palettes-container">
                            {palettes.map((p, index) =>
                                <div key={index}>
                                    <Palette palette={p} selectedPalette={palette} handlePaletteChange={handlePaletteChange} />
                                </div>
                            )}
                        </div>
                        <Typography variant="h6">Main image and cover</Typography>
                        <div className="upload-images">
                            <Button 
                                variant="contained" 
                                component="label" 
                                className={classes.button}
                                style={{backgroundColor: '#363d4d'}}>
                                Upload Main Image
                                <input
                                    accept="image/*"
                                    id="upload-main-photo"
                                    name="upload-main-photo"
                                    type="file"
                                    hidden
                                    onChange={uploadMainImage} />
                            </Button>
                            <Button 
                                variant="contained" 
                                component="label" 
                                className={classes.button}
                                style={{backgroundColor: '#0a71e7'}}>
                                Upload Cover Image
                                <input
                                    accept="image/*"
                                    id="upload-main-photo"
                                    name="upload-main-photo"
                                    type="file"
                                    hidden
                                    onChange={uploadCoverImage} />
                            </Button>
                        </div>
                        <Typography variant="h6">Image gallery</Typography>
                        <Typography variant="caption">If you have any photos you want to show you clients, you can upload them</Typography>
                        <FormControlLabel
                            control={<Checkbox checked={gallery} onChange={() => setGallery(!gallery)} style={{color: '#0a71e7'}} />}
                            label="Add image gallery"
                            name="gallery"
                        />
                        <Button 
                            variant="contained" 
                            component="label" 
                            disabled={!gallery}
                            className={classes.button}
                            style={gallery ? {backgroundColor: '#363d4d', width: 'fit-content'} : {width: 'fit-content'}}>
                            Upload Images To Gallery
                            <input
                                accept="image/*"
                                id="upload-main-photo"
                                name="upload-main-photo"
                                type="file"
                                hidden
                                multiple
                                onChange={uploadGalleryIamges} />
                        </Button>
                    </section>
                    <section id="information" style={!urlConfirm ? {pointerEvents: 'none'} : null}>
                        <Typography variant="h5">Information About Your Bussiness</Typography>
                        <Typography variant="h6">Language</Typography>
                        <Typography variant="caption">The language in which you want your card to be displayed</Typography>
                        <FormControl>
                            <InputLabel className={classes.label}>Language...</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={langauge}
                                className={classes.select}
                                disableUnderline
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <MenuItem value="English">English</MenuItem>
                                <MenuItem value="Hebrew">Hebrew</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="h6">Business basic details</Typography>
                        <Typography variant="caption">Exept address, all the fields are required</Typography>
                        <div className="basic-details">
                            <Input
                                id="name"
                                placeholder="Name..."
                                fullWidth
                                disableUnderline
                                className={classes.input}
                                inputProps={{ style: { marginLeft: 15 } }}
                                style={{ marginBottom: 10 }}
                                autoComplete="off"
                                value={name} 
                                onChange={(e) => setName(e.target.value)} />
                            <Input
                                id="type"
                                placeholder="Type..."
                                fullWidth
                                disableUnderline
                                className={classes.input}
                                inputProps={{ style: { marginLeft: 15 } }}
                                style={{ marginBottom: 10 }}
                                autoComplete="off"
                                value={type} 
                                onChange={(e) => setType(e.target.value)} />
                            <Input
                                id="description"
                                placeholder="Description..."
                                fullWidth multiline
                                disableUnderline
                                className={classes.input}
                                inputProps={{ style: { marginLeft: 15 } }}
                                style={{ marginBottom: 10 }}
                                autoComplete="off"
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} />
                            <Input
                                id="address"
                                placeholder="Address..."
                                fullWidth
                                disableUnderline
                                className={classes.input}
                                inputProps={{ style: { marginLeft: 15 } }}
                                style={{ marginBottom: 10 }}
                                autoComplete="off"
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)} />
                            <FormControlLabel
                                control={<Checkbox checked={wazeButton} onChange={() => setWazeButton(!wazeButton)} style={{color: '#0a71e7'}} />}
                                label="Add waze button?"
                                name="Waze button"
                            />
                        </div>
                        <Typography variant="h6">Contact</Typography>
                        <Typography variant="caption">In what ways can people contact you?</Typography>
                        <Typography variant="overline">Traditional ways</Typography>
                        <div className="contact">
                            <FormControlLabel
                                control={<Checkbox checked={contact[0].show} onChange={() => handleChange(0, 'contact')} style={{color: '#0a71e7'}} />}
                                label="Telephone"
                                name="telephone"
                            />
                            <Input
                                id="Telephone"
                                placeholder="Telephone number..."
                                type="tel"
                                autoComplete="off"
                                disableUnderline
                                disabled={!contact[0].show}
                                value={contact[0].value}
                                inputProps={{ maxLength: 9, style: { marginLeft: 10 } }}
                                endAdornment=
                                {
                                    regex.telephone.test(contact[0].value) && contact[0].value.length === 9 ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => handleInputsChange(0, e.target.value, 'contact')} />
                        </div>
                        <div className="contact">
                            <FormControlLabel
                                control={<Checkbox checked={contact[1].show} onChange={() => handleChange(1, 'contact')} style={{color: '#0a71e7'}} />}
                                label="Phone"
                                name="phone"
                            />
                            <Input
                                id="Phone"
                                placeholder="Phone number..."
                                type="tel"
                                autoComplete="off"
                                disableUnderline
                                disabled={!contact[1].show}
                                value={contact[1].value}
                                inputProps={{ maxLength: 10, style: { marginLeft: 10 } }}
                                endAdornment=
                                {
                                    regex.phone.test(contact[1].value) && contact[1].value.length === 10 ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => handleInputsChange(1, e.target.value, 'contact')} />
                        </div>
                        <div className="contact">
                            <FormControlLabel
                                control={<Checkbox checked={contact[2].show} onChange={() => handleChange(2, 'contact')} style={{color: '#0a71e7'}} />}
                                label="WhatsApp"
                                name="whatsapp"
                            />
                            <Input
                                id="Whatsapp"
                                placeholder="International format phone number..."
                                type="tel"
                                autoComplete="off"
                                disableUnderline
                                disabled={!contact[2].show}
                                value={contact[2].value}
                                inputProps={{ maxLength: 12, style: { marginLeft: 10 } }}
                                endAdornment=
                                {
                                    regex.whatsapp.test(contact[2].value) && contact[2].value.length === 12 ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => handleInputsChange(2, e.target.value, 'contact')} />
                        </div>
                        <div className="contact">
                            <FormControlLabel
                                control={<Checkbox checked={contact[3].show} onChange={() => handleChange(3, 'contact')} style={{color: '#0a71e7'}} />}
                                label="Telegram"
                                name="telegram"
                            />
                            <Input
                                id="Telegram"
                                placeholder="Telegram username..."
                                type="tel"
                                autoComplete="off"
                                disableUnderline
                                disabled={!contact[3].show}
                                value={contact[3].value}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    regex.telegram.test(contact[3].value) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => handleInputsChange(3, e.target.value, 'contact')} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={contact[4].show} onChange={() => handleChange(4, 'contact')} style={{color: '#0a71e7'}} />}
                                label="Email"
                                name="email"
                            />
                            <Input
                                id="Email"
                                placeholder="email address..."
                                type="email"
                                autoComplete="off"
                                disableUnderline
                                disabled={!contact[4].show}
                                value={contact[4].value}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    regex.email.test(contact[4].value) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => handleInputsChange(4, e.target.value, 'contact')} />
                        </div>
                        <Typography variant="overline">Social media</Typography>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={socials[0].show} onChange={() => handleChange(0, 'socials')} style={{color: '#0a71e7'}} />}
                                label="Facebook"
                                name="facebook"
                            />
                            <Input
                                id="Facebook URL"
                                placeholder="Facebook URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!socials[0].show}
                                value={socials[0].link}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    socialLinks.isValid('facebook', socials[0].link) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => handleInputsChange(0, e.target.value, 'socials')} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={socials[1].show} onChange={() => handleChange(1, 'socials')} style={{color: '#0a71e7'}} />}
                                label="Instagram"
                                name="instagram"
                            />
                            <Input
                                id="Instagram URL"
                                placeholder="Instagram URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!socials[1].show}
                                value={socials[1].link}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    socialLinks.isValid('instagram', socials[1].link) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => handleInputsChange(1, e.target.value, 'socials')} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={socials[2].show} onChange={() => handleChange(2, 'socials')} style={{color: '#0a71e7'}} />}
                                label="Linkedin"
                                name="linkedin"
                            />
                            <Input
                                id="Linkedin URL"
                                placeholder="Linkedin URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!socials[2].show}
                                value={socials[2].link}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    socialLinks.isValid('linkedin', socials[2].link) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => handleInputsChange(2, e.target.value, 'socials')} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={socials[3].show} onChange={() => handleChange(3, 'socials')} style={{color: '#0a71e7'}} />}
                                label="Github"
                                name="github"
                            />
                            <Input
                                id="Github URL"
                                placeholder="Github URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!socials[3].show}
                                value={socials[3].link}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    socialLinks.isValid('github', socials[3].link) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => handleInputsChange(3, e.target.value, 'socials')} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={socials[4].show} onChange={() => handleChange(4, 'socials')} style={{color: '#0a71e7'}} />}
                                label="Pinterest"
                                name="pinterest"
                            />
                            <Input
                                id="Pinterest URL"
                                placeholder="Pinterest URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!socials[4].show}
                                value={socials[4].link}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    /^(http(s?):\/\/)?(www\.)?pinterest\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/.test(socials[4].link) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => handleInputsChange(4, e.target.value, 'socials')} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={socials[5].show} onChange={() => handleChange(5, 'socials')} style={{color: '#0a71e7'}} />}
                                label="Youtube"
                                name="youtube"
                            />
                            <Input
                                id="Youtube URL"
                                placeholder="Youtube channel URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!socials[5].show}
                                value={socials[5].link}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    socialLinks.isValid('youtube', socials[5].link) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => handleInputsChange(5, e.target.value, 'socials')} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={socials[6].show} onChange={() => handleChange(6, 'socials')} style={{color: '#0a71e7'}} />}
                                label="Tiktok"
                                name="tiktok"
                            />
                            <Input
                                id="Tiktok URL"
                                placeholder="Tiktok URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!socials[6].show}
                                value={socials[6].link}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    socialLinks.isValid('tiktok', socials[6].link) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => handleInputsChange(6, e.target.value, 'socials')} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={socials[7].show} onChange={() => handleChange(7, 'socials')} style={{color: '#0a71e7'}} />}
                                label="Dribbble"
                                name="dribbble"
                            />
                            <Input
                                id="Dribbble URL"
                                placeholder="Dribbble URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!socials[7].show}
                                value={socials[7].link}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    socialLinks.isValid('dribbble', socials[7].link) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => handleInputsChange(7, e.target.value, 'socials')} />
                        </div>
                        <div className="social">
                            <FormControlLabel
                                control={<Checkbox checked={socials[8].show} onChange={() => handleChange(8, 'socials')} style={{color: '#0a71e7'}} />}
                                label="Website"
                                name="website"
                            />
                            <Input
                                id="Website URL"
                                placeholder="Website URL..."
                                autoComplete="off"
                                disableUnderline
                                disabled={!socials[8].show}
                                value={socials[8].link}
                                inputProps={{ style: { marginLeft: 10 }}}
                                endAdornment=
                                {
                                    regex.website.test(socials[8].link) ? 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <DoneRoundedIcon style={{ color: green[900] }}/>
                                    </InputAdornment> 
                                    : 
                                    <InputAdornment style={{marginRight: 10}} position="end">
                                        <ClearRoundedIcon style={{ color: red[700] }}/>
                                    </InputAdornment> 
                                }
                                className={classes.input}
                                onChange={(e) => handleInputsChange(8, e.target.value, 'socials')} />
                        </div>
                    </section>
                    <Button 
                        className="submit"
                        variant="contained" 
                        disabled={!urlConfirm}
                        style={urlConfirm ? {backgroundColor: '#0a71e7'} : null}
                        onClick={() => submitCard()}>Submit</Button>
                    <ToastContainer
                        position="bottom-center"
                        closeOnClick
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </MuiThemeProvider>
            </div>
        </div>
    )
}

export default withRouter(AddCard);