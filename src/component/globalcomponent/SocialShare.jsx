import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Share2 } from "feather-icons-react";
import {
    RedditShareButton,
    RedditIcon,
    TwitterShareButton,
    XIcon,
    LinkedinShareButton,
    LinkedinIcon
} from "react-share";

function SocialShare({ id }) {
    return (
        <>
            <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={
                    <Popover>
                        <Popover.Body>
                            <div className="flex justify-content-between">
                                <RedditShareButton url={`events/${id}`} className='px-1'>
                                    <RedditIcon size={32} round />
                                </RedditShareButton>
                                <TwitterShareButton url={`events/${id}`} className='px-1'>
                                    <XIcon size={32} round />
                                </TwitterShareButton>
                                <LinkedinShareButton url={`events/${id}`} className='px-1'>
                                    <LinkedinIcon size={32} round />
                                </LinkedinShareButton>
                            </div>
                        </Popover.Body>
                    </Popover>
                }
            >
                <Button variant="secondary" className='btn btn-dark rounded-circle'>
                    <Share2 />
                </Button>
            </OverlayTrigger>
        </>
    );
}

export default SocialShare;