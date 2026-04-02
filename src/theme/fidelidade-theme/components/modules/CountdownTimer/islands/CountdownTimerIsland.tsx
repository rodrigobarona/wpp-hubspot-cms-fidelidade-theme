import { useEffect, useState } from 'react';
import { CountdownTimerProps, GroupStyle, TimeLeft, EndDate, CounterStyles, CounterLabelsStyles } from '../types.js';
import { cn } from '../../../utils/cn.js';
import { createComponent } from '../../../utils/create-component.js';
import { CSSPropertiesMap } from '../../../types/components.js';
import '../../../styles/tailwind.css';

// Components
const CountdownTimer = createComponent('time');
const TimeUnitContainer = createComponent('div');
const Value = createComponent('span');
const Label = createComponent('span');
const CompletedMessage = createComponent('p');

// Functions to generate CSS variables
function generateCounterCssVars(counter: CounterStyles): CSSPropertiesMap {
  return {
    '--hsFidelidade--countdownTimer__borderThickness': `${counter?.borderThickness ?? 1}px`,
    '--hsFidelidade--countdownTimer__borderColor': counter?.borderColor?.color || '#000',
    '--hsFidelidade--countdownTimer__textColor': counter?.textColor?.color || '#000',
    '--hsFidelidade--countdownTimer__fillColor': counter?.fillColor?.color || 'transparent',
  };
}

function generateCounterLabelsCssVars(counterLabels: CounterLabelsStyles): CSSPropertiesMap {
  return {
    '--hsFidelidade--countdownTimer__labelTextColor': counterLabels?.textColor?.color || '#000',
  };
}

export const calculateTimeLeft = (endDate: EndDate): TimeLeft => {
  // Calculate difference between the current date and end date in seconds
  const differenceBetweenDates = (endDate - Date.now()) / 1000;
  const secondsPerMinute = 60;
  const minutesPerHour = 60;
  const secondsPerHour = secondsPerMinute * minutesPerHour;
  const hoursPerDay = 24;

  // Based on the difference, calculate the time left for days, hours, minutes, and seconds
  return {
    days: Math.floor(differenceBetweenDates / (secondsPerHour * hoursPerDay)),
    hours: Math.floor((differenceBetweenDates / secondsPerHour) % hoursPerDay),
    minutes: Math.floor((differenceBetweenDates / secondsPerMinute) % minutesPerHour),
    seconds: Math.floor(differenceBetweenDates % secondsPerMinute),
  };
};

type TimeUnitProps = {
  value: number;
  label: string;
  groupStyle: GroupStyle;
};

const countdownValueBaseClass = cn(
  'w-full py-hs-16 px-hs-12 min-[767px]:py-hs-32 min-[767px]:px-hs-24',
  'border border-[length:var(--hsFidelidade--countdownTimer__borderThickness)] border-[color:var(--hsFidelidade--countdownTimer__borderColor)]',
  'rounded-hs text-[color:var(--hsFidelidade--countdownTimer__textColor)]',
  'text-[clamp(1rem,5vw+1rem,var(--hsFidelidade--display1__fontSize))] leading-none text-center',
);

const TimeUnit = (props: TimeUnitProps) => {
  const {
    value,
    label,
    groupStyle: { counter, counterLabels },
  } = props;
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const cssVarsMap = {
    ...generateCounterCssVars(counter),
    ...generateCounterLabelsCssVars(counterLabels),
  };

  const valueClasses = cn(countdownValueBaseClass, counter?.fill === 'filled' && 'bg-[var(--hsFidelidade--countdownTimer__fillColor)]');

  return (
    <TimeUnitContainer
      className={cn(
        'flex w-[max(min(200px,25%),25%)] flex-col items-center gap-hs-8',
      )}
      style={cssVarsMap}
    >
      <Value className={valueClasses}>{formatNumber(value)}</Value>
      <Label
        className={cn(
          'w-full text-center text-[color:var(--hsFidelidade--countdownTimer__labelTextColor)]',
          'text-[clamp(0.75rem,1vw+0.75rem,var(--hsFidelidade--h4__fontSize))]',
        )}
      >
        {label}
      </Label>
    </TimeUnitContainer>
  );
};

export default function CountdownTimerIsland(props: CountdownTimerProps) {
  const {
    endDate,
    groupStyle,
    groupPlaceholderText: { days, hours, minutes, seconds, completedMessage },
  } = props;

  // Calculate initial time remaining
  const initialTime = calculateTimeLeft(endDate);

  // Initialize state with calculated value
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTime);

  // Effect hook to manage the interval timer
  useEffect(() => {
    // Define update function to recalculate time remaining
    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft(endDate));
    };

    // Initial calculation
    updateTimer();

    // Set up interval for updates if end date hasn't passed
    if (endDate > Date.now()) {
      const interval = setInterval(updateTimer, 1000);
      // Clean up interval on unmount or when endDate changes
      return () => clearInterval(interval);
    }
  }, [endDate]);

  const dateTimeString = new Date(endDate).toISOString();

  const completedMessageCssVars = generateCounterLabelsCssVars(groupStyle.counterLabels);

  // If countdown is complete, show a message
  if (endDate <= Date.now()) {
    return (
      <CompletedMessage
        className="text-center text-[color:var(--hsFidelidade--countdownTimer__labelTextColor)]"
        style={completedMessageCssVars}
      >
        {completedMessage}
      </CompletedMessage>
    );
  }

  return (
    <CountdownTimer
      className={cn('flex items-start justify-center gap-hs-12 min-[767px]:gap-hs-20')}
      dateTime={dateTimeString}
    >
      <TimeUnit value={timeLeft.days} label={days} groupStyle={groupStyle} />
      <TimeUnit value={timeLeft.hours} label={hours} groupStyle={groupStyle} />
      <TimeUnit value={timeLeft.minutes} label={minutes} groupStyle={groupStyle} />
      <TimeUnit value={timeLeft.seconds} label={seconds} groupStyle={groupStyle} />
    </CountdownTimer>
  );
}
