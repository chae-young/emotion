import { useCallback } from "react"
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types"
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import Link from 'next/link';
import {PopoverWrap,PopoverProfile,PopoverInfo,PopoverBtn} from '../styles/style';
import { LOG_OUT_REQUEST } from '../reducers/user';

const MypopOver = ({options})=>{
    const dispatch = useDispatch();
    const {me} = useSelector((state)=>state.user);
    const handleClose = () => {
        options.setAnchorEl(null);
    };
    const onLogout = useCallback(()=>{
        dispatch({type:LOG_OUT_REQUEST})
        handleClose()
    })
    return(
        <Popover
            id={options.id}
            open={options.open}
            anchorEl={options.anchorEl} 
            onClose={handleClose}     
        >
            <PopoverWrap>
                <PopoverProfile>
                    <div className="profile__img">
                        <Avatar alt="내 프로필 사진" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/171216_%EC%96%91%EC%84%B8%EC%A2%85_10.jpg/375px-171216_%EC%96%91%EC%84%B8%EC%A2%85_10.jpg" width="10%" />
                    </div>
                    <PopoverInfo>
                        <Link href="/profile"><a className="profile-nick">{me.nickname}</a></Link>
                        <Link href="/write"><a className="profile-write">글쓰기</a></Link>
                        <span className="id">{me.id}</span>
                        <button onClick={onLogout}>로그아웃</button>
                    </PopoverInfo>
                </PopoverProfile>
                <PopoverBtn>
                    <button>내 글<br/> 0 </button>
                    <button>팔로워<br/> 0 </button>
                    <button>팔로잉<br/> 0 </button>
                </PopoverBtn>
            </PopoverWrap>
        </Popover>        
    )
}

MypopOver.propTypes={
    options:PropTypes.shape({
        id:PropTypes.string,
        open:PropTypes.boolean,
        anchorEl:PropTypes.boolean,
        setAnchorEl:PropTypes.boolean,
    }),
}

export default MypopOver;