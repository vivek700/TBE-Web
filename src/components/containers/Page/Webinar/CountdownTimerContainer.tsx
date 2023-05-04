import { FlexContainer, Text, TimerItem } from '@/components';
import { CountdownTimerContainerProps } from '@/interfaces';

const CountdownTimerContainer = ({
  countdownTime,
}: CountdownTimerContainerProps) => {
  return (
    <FlexContainer direction='col' className='mt-6 gap-2'>
      <Text level='p' className='strong-text'>
        Starts in
      </Text>
      <FlexContainer className='gap-2'>
        {countdownTime.map((timer, key) => (
          <TimerItem timer={timer} key={key} />
        ))}
      </FlexContainer>
    </FlexContainer>
  );
};

export default CountdownTimerContainer;
