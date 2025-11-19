import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur-sm" style={{ height: 360 }}>
      <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
