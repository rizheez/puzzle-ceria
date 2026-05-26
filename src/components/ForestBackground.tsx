export function ForestBackground() {
  return (
    <div className="forest-background pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="forest-sun">
        <span />
      </div>

      <div className="cloud cloud-left">
        <span />
        <span />
        <span />
      </div>
      <div className="cloud cloud-right">
        <span />
        <span />
        <span />
      </div>

      <div className="bird bird-left">
        <span />
        <span />
      </div>
      <div className="bird bird-right">
        <span />
        <span />
      </div>

      <div className="butterfly butterfly-pink">
        <span />
        <span />
        <i />
      </div>
      <div className="butterfly butterfly-sky">
        <span />
        <span />
        <i />
      </div>

      <div className="hill hill-back" />
      <div className="hill hill-front" />
      <div className="grass-ground" />

      <div className="cartoon-tree tree-left">
        <span className="trunk" />
        <span className="leaf leaf-top" />
        <span className="leaf leaf-left" />
        <span className="leaf leaf-right" />
      </div>
      <div className="cartoon-tree tree-right">
        <span className="trunk" />
        <span className="leaf leaf-top" />
        <span className="leaf leaf-left" />
        <span className="leaf leaf-right" />
      </div>

      <div className="bush bush-left">
        <span />
        <span />
        <span />
      </div>
      <div className="bush bush-right">
        <span />
        <span />
        <span />
      </div>

      <div className="flowers flowers-left">
        <span />
        <span />
        <span />
      </div>
      <div className="flowers flowers-right">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
