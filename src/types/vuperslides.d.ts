
declare module 'vueperslides' {
  import { VNode, ComponentPublicInstance } from 'vue';

  // Slide Interface (Slide Item)
  export interface Slide {
    id: string | number;
    image: string;
    video: VideoObj | null;
    title: string;
    content: string;
    contentSlot: VNode[] | null;
    loaderSlot: VNode[] | null;
    link: string;
    style: string;
    loadImage: () => Promise<{ image: string, style: string }>;
    duration: number;
  }

  // Video Object for Each Slide
  export interface VideoObj {
    url: string;
    alt: string;
    props: { controls: boolean };
  }

  // Configuration Props for the Parent Component (VueperSlides)
  export interface VueperSlidesProps {
    autoplay: boolean;
    autoplayInterval: number;
    visibleSlides: number;
    lazy: boolean;
    fade: boolean;
    rtl: boolean;
    parallax: boolean;
    slideImageInside: boolean;
    gap: number;
    gapPx: boolean;
    '3d': boolean;
  }

  // Parent Component - VueperSlides
  export interface VueperSlidesComponent {
    slides: Slide[];
    activeId: string | number;
    current: number;
    firstVisible: number;
    conf: VueperSlidesProps;
    isPaused: boolean;
    touch: { justDragged: boolean }; // Example of more specific typing (can be expanded based on usage)
    addSlide: (slide: Slide) => void;
    updateSlide: (id: string | number, props: Partial<Slide>) => void;
    removeSlide: (id: string | number) => void;
    goToSlide: (index: number, options: { autoPlaying: boolean }) => void;
    pauseAutoplay: () => void;
    resumeAutoplay: () => void;
    enableParallax: () => void;
    disableParallax: () => void;
  }

  // Parent Component Export (VueperSlides)
  export const VueperSlides: {
    new (): VueperSlidesComponent;
    install(app: ComponentPublicInstance): void;
  };

  // Props for the Child Component (VueperSlide)
  export interface VueperSlideProps {
    clone: boolean;
    image: string;
    video: string | VideoObj;
    title: string;
    content: string;
    link: string;
    duration: number;
    lazyloaded: boolean;
    openInNew: boolean | string;
  }

  // Child Component - VueperSlide
  export interface VueperSlideComponent {
    clone: boolean;
    image: string;
    video: string | VideoObj;
    content: string;
    link: string;
    duration: number;
    lazyloaded: boolean;
    openInNew: boolean | string;
    slides: Slide[];
    touch: { justDragged: boolean }; // More specific type for touch-related properties
    updateSlide: (id: string | number, props: Partial<VueperSlideProps>) => void;
    addClone: () => void;
    addSlide: (slide: Slide) => void;
    removeSlide: (id: string | number) => void;
    imageSrc: string;
    loading: boolean;
    loaded: boolean;
    conf: VueperSlidesProps; // Conf is of type VueperSlidesProps, defined earlier
    slideClasses: Record<string, boolean>;
    slideStyles: Record<string, string>;
    videoObj: VideoObj | null;
    youtubeVideo: boolean;
    imageStyles: Record<string, string>;
    slideFace3d: string | false;
    isPreviousSlide: boolean;
    isNextSlide: boolean;
    isSlideVisible: boolean;
    slidesList: Array<string | number>;
    slidesCount: number;
    slideIndex: number;
    justDragged: boolean;
    updateThisSlide: (props: Partial<VueperSlideProps>) => void;
    loadImage: () => Promise<{ image: string, style: string }>;
    playVideo: () => void;
    pauseVideo: () => void;
    $emit(event: 'mouse-enter', data: { slideIndex: number, title: string, content: string, image: string, link: string }, element: HTMLElement): void;
    $emit(event: 'mouse-leave'): void;
  }

  // Child Component Export (VueperSlide)
  export const VueperSlide: {
    new (): VueperSlideComponent;
    install(app: ComponentPublicInstance): void;
  };
}