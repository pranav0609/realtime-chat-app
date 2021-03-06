import React from "react";
import moment from 'moment';
import { Comment, Tooltip } from 'antd';

function ChatCard(props) {
    return (
        <div style={{ width: '100%' }}>
            <Comment
                author={<b style = {{

                    color: 'black',

                    fontSize: "150%"

                }}>{                        

                    props.sender.name

                    }

                </b>

            }
                
                content={
                    props.message.substring(0, 8) === "uploads\\" ?
                        // this will be either video or image 

                        props.message.substring(props.message.length - 3, props.message.length) === 'mp4' ?
                            <video
                                style={{ maxWidth: '200px' }}
                                src={`http://localhost:4500/${props.message}`} alt="video"
                                type="video/mp4" controls
                            />
                            :
                            <img
                                style={{ maxWidth: '200px' }}
                                src={`http://localhost:4500/${props.message}`}
                                alt="img"
                            />
                        :
                        <p>
                            <b>
                            {props.message}
                            </b>
                        </p>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span style = {{

color: 'grey'

}}>

<b>

{moment().fromNow()}

</b>



</span>
                    </Tooltip>
                }
            />
        </div>
    )
}

export default ChatCard;