// device mocks

function ScreenContent() {
  return (
    <div className="p-3 space-y-2 h-full bg-gradient-to-br from-[#120e22] to-[#0c0a18]">
      <div className="flex items-center justify-between">
        <div className="h-2 w-12 rounded bg-white/15" />
        <div className="flex gap-1">
          <div className="h-1.5 w-5 rounded bg-white/10" />
          <div className="h-1.5 w-5 rounded bg-white/10" />
          <div className="h-1.5 w-6 rounded-full bg-[var(--pink)]" />
        </div>
      </div>
      <div className="h-2 w-3/4 rounded bg-white/20" />
      <div className="h-4 w-11/12 rounded bg-gradient-to-r from-[var(--green)] via-[#b58a6c] to-[var(--pink)]" />
      <div className="h-1.5 w-full rounded bg-white/10" />
      <div className="h-1.5 w-5/6 rounded bg-white/10" />
      <div className="grid grid-cols-3 gap-1.5 pt-1">
        <div className="h-8 rounded bg-white/[0.05] border border-white/10" />
        <div className="h-8 rounded bg-white/[0.05] border border-white/10" />
        <div className="h-8 rounded bg-white/[0.05] border border-white/10" />
      </div>
    </div>
  );
}

function Desktop() {
  return (
    <div className="relative w-full animate-float">
      <div className="rounded-xl bg-[#0e0b1a] border border-white/10 overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 bg-white/[0.03]">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <div className="ml-2 flex-1 h-4 rounded bg-white/[0.06] border border-white/10 px-2 flex items-center text-[9px] text-white/50">
            pixelo.studio
          </div>
        </div>
        <div className="aspect-[16/10]">
          <ScreenContent />
        </div>
      </div>
      <div className="mx-auto h-2 w-1/3 bg-white/10 rounded-b-md" />
    </div>
  );
}

function Tablet() {
  return (
    <div className="relative w-[55%] animate-float-slow">
      <div className="rounded-2xl bg-[#0e0b1a] border border-white/10 p-2 overflow-hidden">
        <div className="rounded-lg overflow-hidden aspect-[3/4]">
          <ScreenContent />
        </div>
      </div>
    </div>
  );
}

function Phone() {
  return (
    <div className="relative w-[32%] animate-float-rev">
      <div className="rounded-[22px] bg-[#0e0b1a] border border-white/10 p-1.5 overflow-hidden">
        <div className="rounded-[16px] overflow-hidden aspect-[9/19] relative">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-black/60 z-10" />
          <ScreenContent />
        </div>
      </div>
    </div>
  );
}

export function BrowserMock() {
  return (
    <div className="relative w-full max-w-[640px] mx-auto flex items-end justify-center gap-4">
      <Phone />
      <Desktop />
      <Tablet />
    </div>
  );
}
