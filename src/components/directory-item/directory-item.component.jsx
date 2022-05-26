import { useNavigate } from 'react-router-dom';

import {DirectoryItemContainer, BackgroundImage, Body, H2, Para} from './directory-item.styles';

const DirectoryItem = ({ category }) => {
    const {imageUrl, title, route} = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <Body>
                <H2>{title}</H2>
                <Para>Shop Now</Para>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;