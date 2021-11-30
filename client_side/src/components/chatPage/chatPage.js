import React, { Component } from 'react'
import { Form, Input, Button, Row, Col } from 'antd';
import Icon from '@ant-design/icons';
import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";
import {getChats, afterPostMessage} from '../../actions/chat_actions';
import ChatCard from "./Sections/ChatCard";
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import background from "./chat_bg.jpg"

export class ChatPage extends Component {

    state = {
        chatMessage: "",
        chatArray: []
    }
    componentDidMount() {
        
        //this.props.getChatsFunction();
        this.socket = io('http://localhost:4500', {transports: ['websocket', 'polling', 'flashsocket']});
        this.props.dispatch(getChats());
        this.socket.on("output chat message", messageFromBackend => {
            this.props.dispatch(afterPostMessage(messageFromBackend));
        })
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
    }
    
    handleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }
    
    
    renderCards = () => {
        //console.log("hello")
        //var chats = Array.from(this.props.chats.chats);
        return this.props.chats.chats
        && (this.props.chats.chats).map((chat) => (
            <ChatCard key={chat._id}  { ...chat }/>
        ));
        
    }

    onDrop = (files) => {
        console.log(files);

        
        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in first');
        }


        let formData = new FormData;
        const config = {
            header: { 'content-type': 'multitype/form-data' }
        }
        formData.append("file", files[0])
        Axios.post('api/chat/uploadfiles', formData, config)
        .then(response => {
            if (response.data.success) {
                let chatMessage = response.data.url;
                let userId = this.props.user.userData._id
                let userName = this.props.user.userData.name;
                
                let nowTime = moment();
                let type = "VideoOrImage"

                this.socket.emit("Input Chat Message", {
                    chatMessage,
                    userId,
                    userName,
                    nowTime,
                    type
                });
            }
        })
    }
    

    submitChatMessage = (e) => {
        e.preventDefault();

        
        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in first');
        }


        let chatMessage = this.state.chatMessage;
        let userId = this.props.user.userData._id;
        let userName = this.props.user.userData.name;
        let type = "Text"
        let nowTime = moment();

        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            type,
            nowTime
        });

        this.setState({ chatMessage: "" })

    }
    
    render() {
        return (
            <React.Fragment>
                
                <div style={{ 
                backgroundImage: `url(${background})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '105vh'
                }}>
                    <div>
                    <p style={{ fontSize: '2rem', textAlign: 'center', color: 'black'}}> 
                    <b>AllChat</b>
                    </p>
                </div>
                <div style={{maxWidth: '800px', margin: '0 auto' }}>
                    <div className="infinite-container" style={{ height: '500px', overflowY: 'scroll' }}>                        
                        
                        {this.props.chats && (
                            this.renderCards()
                        )}
                        <div
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                            style={{ float: "left", clear: "both" }}
                        />
                    </div>

                    <Row >
                        <Form layout="inline" onSubmit={this.submitChatMessage}>
                            <Col span={18}>
                                <Input
                                    id="message"
                                    prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Let's start talking"
                                    type="text"
                                    value={this.state.chatMessage}
                                    onChange={this.handleSearchChange}
                                />
                            </Col>
                            &nbsp; &nbsp; &nbsp;
                            <Col span={2}>
                                <Dropzone onDrop={this.onDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Button>
                                                    <Icon type="upload" />
                                                </Button>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </Col>
                            
                            <Col span={2}>
                                <Button type="primary" style={{ width: '100%' }} onClick={this.submitChatMessage} htmlType="submit">
                                    <Icon type="enter" />
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </div>
                </div>
                
            </React.Fragment>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//       getChatsFunction: () => {
//         dispatch(getChats)
//       }
// }
//   }

const mapStateToProps = state => {
    return{
        user: state.user,
        chats: state.chat
    }
}

export default connect (mapStateToProps)(ChatPage);
