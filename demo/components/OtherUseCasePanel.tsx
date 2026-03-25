import { stackRouter } from "../stackRouter";
import { PopupID } from "../constants/popupIds";
import NormalPopup from "../popups/NormalPopup";
import RandomHeightPopup from "../popups/RandomHeightPopup";

export function OtherUseCasePanel() {
  return (
    <section className="card">
      <div className="card-header">
        <h2>其他用法</h2>
      </div>

      <div className="button-group">
        <button
          onClick={() =>
            stackRouter.open(PopupID.CustomContent, {
              Component:
                Math.random() > 0.5 ? <NormalPopup /> : <RandomHeightPopup />,
            })
          }
        >
          调用时传入内容
        </button>

        <button onClick={() => stackRouter.open(PopupID.CustomWrapper, {})}>
          自定义包装
        </button>
      </div>
      <div className="subtle" style={{ marginBlock: 12 }}>
        利用 NoneWrapper 制作查看大图功能
      </div>
      <div className="image-group">
        {[
          "https://placehold.co/600x400@2x.png",
          "https://placehold.co/600x400@2x.png",
          "https://placehold.co/300x800@2x.png",
        ].map((src, index) => (
          <img
            src={src}
            alt=""
            key={index}
            style={{ objectFit: index == 1 ? "contain" : "cover" }}
            onClick={(e) =>
              stackRouter.open(PopupID.ImageViewer, {
                src: src,
                pos: Object.assign(
                  (e.target as HTMLImageElement).getBoundingClientRect(),
                  { radius: 8 },
                ),
                objectFit: index == 1 ? "contain" : "cover",
                hiddenControl: e.target as HTMLElement,
              })
            }
          />
        ))}
      </div>
    </section>
  );
}
