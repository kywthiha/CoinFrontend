export default function Loading() {
  return (
    <>
      <div className="loading">
        <style jsx>{`
          .loading {
            position: relative;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 1rem 0;

          }
          .fountainG {
            background-color: #534d82;
            width: 21px;
            height: 21px;
            animation-name: bounce_fountainG;
            animation-duration: 1.1s;
            animation-iteration-count: infinite;
            animation-direction: linear;
            transform: scale(0.3);
            border-radius: 14px;
          }
          .f1 {
            animation-delay: 0.44s;
          }
          .f2 {
            animation-delay: 0.55s;
          }
          .f3 {
            animation-delay: 0.66s;
          }
          .f4 {
            animation-delay: 0.77s;
          }
          .f5 {
            animation-delay: 0.88s;
          }
          .f6 {
            animation-delay: 0.99s;
          }
          .f7 {
            animation-delay: 1.1s;
          }
          .f8 {
            animation-delay: 1.21s;
          }
          @keyframes bounce_fountainG {
            0% {
              transform: scale(1);
              background-color: #534d82;
            }
            100% {
              transform: scale(0.3);
              background-color: #9488f0;
            }
          }
        `}</style>
        <div className="fountainG f1"></div>
        <div className="fountainG f2"></div>
        <div className="fountainG f3"></div>
        <div className="fountainG f4"></div>
        <div className="fountainG f5"></div>
        <div className="fountainG f6"></div>
        <div className="fountainG f7"></div>
        <div className="fountainG f8"></div>
      </div>
    </>
  );
}
