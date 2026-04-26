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
          调用时传入内容当命令式Modal用
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
            draggable={false}
            style={{ objectFit: index == 1 ? "contain" : "cover" }}
            onClick={(e) =>
              stackRouter.open(PopupID.ImageViewer, {
                src: src,
                pos: Object.assign(
                  (e.target as HTMLImageElement).getBoundingClientRect(),
                  { radius: 12 },
                ),
                objectFit: index == 1 ? "contain" : "cover",
                hiddenControl: e.target as HTMLElement,
              })
            }
          />
        ))}
      </div>
      <div className="subtle" style={{ marginBlock: 12 }}>
        ⬇️ 复杂的动画可以新增一种自定义包装来实现
      </div>
      <div className="image-group" style={{ aspectRatio: 'unset' }}>
        {[
          "https://placehold.co/300x400?text=Click+Me!",
          "https://placehold.co/300x400?text=Click+Me!",
        ].map((src, index) => (
          <img
            src={src}
            key={index}
            draggable={false}
            onClick={(e) =>
              stackRouter.open(PopupID.CustomWrapper, {
                pos: Object.assign(
                  (e.target as HTMLImageElement).getBoundingClientRect(),
                  { radius: 8 },
                ),
                hiddenControl: e.target as HTMLElement,
              })
            }
            style={{ borderRadius: 8, cursor: "pointer", aspectRatio: 'unset' }}
          />
        ))}
      </div>

    </section>
  );
}
