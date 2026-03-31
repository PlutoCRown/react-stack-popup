import { useMemo, useState } from "react";
import { focusLock, stackRouter } from "../stackRouter";
import { FocusLockState } from "../../src";
import { PopupID } from "../constants/popupIds";

const STATE_LABELS: Record<FocusLockState, string> = {
  [FocusLockState.None]: "None",
  [FocusLockState.IgnoreOpen]: "Ignore Open",
  [FocusLockState.IgnoreClose]: "Ignore Close",
};

export function LockStatePanel() {
  const [state, setState] = useState<FocusLockState>(focusLock.getState());
  const stateLabel = useMemo(() => STATE_LABELS[state], [state]);

  const updateState = (next: FocusLockState) => {
    focusLock.setState(next);
    setState(next);
  };

  return (
    <section className="card">
      <div className="card-header">
        <h2>锁机制【WIP】</h2>
        <span className="subtle">外部调整 open/close 行为</span>
      </div>

      <div className="subtle" style={{ marginBottom: 12 }}>
        当前状态：<strong>{stateLabel}</strong>
      </div>

      <div className="button-group">
        <button onClick={() => updateState(FocusLockState.IgnoreOpen)}>
          Ignore Open
        </button>
        <button onClick={() => updateState(FocusLockState.IgnoreClose)}>
          Ignore Close
        </button>
        <button onClick={() => updateState(FocusLockState.None)}>Reset</button>
        <button
          onClick={() =>
            stackRouter.open(PopupID.FormView, {
              title: "假设你在编辑表单",
              message: "这时候返回需要你确认",
              blockClose: true,
            })
          }
        >
          打开实际用例
        </button>
      </div>
    </section>
  );
}
