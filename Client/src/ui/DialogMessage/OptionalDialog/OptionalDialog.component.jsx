import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function OptionalDialog({ title, content, onAgree  = ()=>{}, onDisagree = ()=>{}, children }) {
    const [open, setOpen] = React.useState(false);

    const onOpen = () => {
        setOpen(true);
    }

    const activeAgree = () => {
        onAgree();
        setOpen(false);
    }

    const activeDisagree = () => {
        onDisagree();
        setOpen(false);
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={activeDisagree}>Disagree</Button>
                    <Button onClick={activeAgree} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <span className="d-flex" onClick={onOpen}>
                {children}
            </span>
        </>
    );
}
