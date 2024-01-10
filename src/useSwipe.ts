interface SwipeInput {
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
}

interface SwipeOutput {
  onTouchStart: (clientX: number) => void;
  onTouchMove: (clientX: number) => void;
  onTouchEnd: () => void;
}

const MIN_SWIPE_DISTANCE = 50;

export function useSwipe(input: SwipeInput): SwipeOutput {
  let touchStart = 0;
  let touchEnd = 0;

  function onTouchStart(clientX: number) {
    touchEnd = 0;
    touchStart = clientX;
  }

  function onTouchMove(clientX: number) {
    touchEnd = clientX;
  }

  const onTouchEnd = () => {
    if (touchStart === 0 || touchEnd === 0) {
      return;
    }
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;
    if (isLeftSwipe) {
      input.onSwipedLeft();
    }
    if (isRightSwipe) {
      input.onSwipedRight();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
