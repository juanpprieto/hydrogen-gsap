import {useEffect, useLayoutEffect, useRef} from 'react';

type GSAP = typeof gsap;

export default function IndexPage() {
  const ref = useRef<HTMLParagraphElement>(null);

  async function animate(gsap: GSAP) {
    if (!ref.current) return;
    const tl = gsap.timeline({defaults: {duration: 1}});
    tl.fromTo(ref.current, {opacity: 0}, {opacity: 1});
    tl.fromTo(
      ref.current,
      {y: '100%'},
      {y: '0%', duration: 1, ease: 'back.out(1.7)'},
      '-=0.5',
    );
  }

  useIsomorphicLayoutEffect(() => {
    async function loadGsap() {
      const gsap = (await import('gsap')).default;
      await animate(gsap);
    }
    loadGsap();
  }, []);

  return (
    <div>
      <p ref={ref}>Animated with GSAP</p>
    </div>
  );
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
