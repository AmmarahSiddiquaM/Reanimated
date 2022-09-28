import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isTimerStarted) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 10); // increase by hundreth of second every time
      }, 10); //Hundreth of a second
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isTimerStarted]);

  const onStart = () => {
    setIsTimerStarted(true);
  };

  const onStop = () => {
    setIsTimerStarted(false);
  };

  const onResume = () => {
    setIsTimerStarted(true);
  };

  const onReset = () => {
    setTime(0);
  };

  const format = n => {
    if (n < 10) {
      return `0${n}`;
    }
    return n;
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>{format(Math.floor(time / 60000) % 60)}:</Text>
        <Text>{format(Math.floor(time / 1000) % 60)}:</Text>
        <Text>{format(Math.floor(time / 10) % 100)}</Text>
      </View>
      <Button title="Start" onPress={onStart} />
      <Button title="Stop" onPress={onStop} />
      <Button title="Resume" onPress={onResume} />
      <Button title="Reset" onPress={onReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
