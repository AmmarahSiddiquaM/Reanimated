import {useEvent, useHandler} from 'react-native-reanimated';

function useAnimatedPagerScrollHandler(handlers, dependencies) {
  const {context, doDependenciesDiffer} = useHandler(handlers, dependencies);
  const subscribeForEvents = ['onPageScroll'];

  return useEvent(
    event => {
      'worklet';
      const {onPageScroll} = handlers;
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context);
      }
    },
    subscribeForEvents,
    doDependenciesDiffer,
  );
}

export default useAnimatedPagerScrollHandler;
