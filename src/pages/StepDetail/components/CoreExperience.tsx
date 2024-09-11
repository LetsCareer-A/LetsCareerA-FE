import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import Chip from '../../components/Chips';
import CareerMenu from '../../../components/CareerMenu';
import Toast from '../../../components/Toast';

interface ExperienceBoxProps {
    card?: { chipText: string; title: string };
    onClick: () => void;
}

const ExperienceBox: React.FC<ExperienceBoxProps> = ({ card, onClick }) => (
    <Box
        sx={{
            display: 'flex',
            width: '260px',
            height: '55px',
            padding: '16px 8px',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            border: `1px solid ${colors.neutral[85]}`,
            bgcolor: colors.neutral[100],
            cursor: 'pointer',
        }}
        onClick={onClick}
    >
        {card ? (
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography style={typography.xSmallBold} color={colors.neutral[10]}>
                    {card.chipText}
                </Typography>
                <Typography style={typography.smallBold} color={colors.neutral[10]}>
                    {card.title}
                </Typography>
            </Box>
        ) : (
            <AddIcon sx={{ width: '24px', height: '24px' }} />
        )}
    </Box>
);

const CoreExperience: React.FC = () => {
    const [isCareerMenuVisible, setIsCareerMenuVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [selectedCareerCards, setSelectedCareerCards] = useState<{ chipText: string; title: string }[]>([]);

    const handleExperienceBoxClick = () => {
        setIsCareerMenuVisible((prev) => !prev);
    };

    const handleCompleteButtonClick = (selectedCards: { chipText: string; title: string }[]) => {
        setSelectedCareerCards((prevCards) => [...prevCards, ...selectedCards]);
        setToastMessage('핵심경험이 추가되었습니다!');
        setTimeout(() => setToastMessage(''), 3000);
        setIsCareerMenuVisible(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '290px',
                height: '317px',
                padding: '16px',
                gap: '15px',
                borderRadius: '12px',
                border: isCareerMenuVisible ? `1px solid ${colors.primary[30]}` : `1px solid ${colors.neutral[85]}`,
                backgroundColor: isCareerMenuVisible ? colors.primary[10] : colors.neutral[100],
            }}
        >
            <Box display="flex" flexDirection="row" gap="8px" alignItems="center">
                <Typography color={colors.neutral[10]} style={typography.smallBold}>
                    핵심경험
                </Typography>
                <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
                    어필할 핵심 경험을 추가해보세요.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedCareerCards.map((card, index) => (
                    <ExperienceBox key={index} card={card} onClick={() => {}} />
                ))}
                <ExperienceBox onClick={handleExperienceBoxClick} />
            </Box>

            {isCareerMenuVisible && (
                <CareerMenu
                    onClose={() => setIsCareerMenuVisible(false)}
                    onComplete={handleCompleteButtonClick}
                />
            )}

            {toastMessage && (
                <Toast
                    message="핵심 경험 등록을 완료했어요!"
                    description="정리된 상세 내용을 자세히 보시려면 각 커리어를 클릭해서 확인해보세요."
                    onClose={() => setToastMessage('')}
                />
            )}
        </Box>
    );
};

export default CoreExperience;
