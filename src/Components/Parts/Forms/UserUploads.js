import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { Grid, Paper, Typography, Button, Fab } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import 'antd/dist/antd.css'


const Dragger = Upload.Dragger;

const props = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};




class UserUploads extends Component {

    handleChange = name => event => {
        console.log(name)
        console.log(event)

        console.log(event.file.originFileObj)

        var file = event.file.originFileObj;
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        console.log(url)
    }

    handlePreview = name => event => {
        console.log(name)
        console.log(event)
    }

    render() {

        return (
            <div>
                <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justify="center"
                    style={{ zIndex: '1' }}>
                    <div style={{ padding: '2.1em' }} >
                        <Paper style={{ width: 600, padding: 30 }}>
                            <Typography variant="h5" >Please Upload Your Avatar</Typography>
                            <Dragger onChange={this.handleChange('PPic')}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            </Dragger>
                        </Paper>
                    </div>
                    <div style={{ borderLeft: '0.1em solid black', padding: '0.5em' }} >
                        <Paper style={{ width: 600, padding: 30, margin: 10 }}>
                            <Typography variant="h5" >Upload the Front of your I.D</Typography>
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            </Dragger>
                        </Paper>

                        <Paper style={{ width: 600, padding: 30, margin: 10 }}>
                            <Typography variant="h5" >Upload the Front of your I.D</Typography>
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            </Dragger>
                        </Paper>
                    </div>

                    <div style={{ position: "absolute", bottom: 0, right: 0, padding: 30 }}>
                        <Button onClick={this.props.next}  >
                            <Fab variant="extended" aria-label="Delete">
                                <ChevronRightIcon />
                                Next
                            </Fab>
                        </Button>
                    </div>
                </Grid>

            </div>
        )

    }

}

export default UserUploads;

