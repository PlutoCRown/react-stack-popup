export const finalizeAnimation = (animation: Animation) => {
  animation.finished.then(() => animation.cancel()).catch(() => { });
};
