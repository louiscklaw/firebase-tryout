class TestRecord {
  constructor(team, pld, w, d, l, gf, ga, gd, pts) {
    this.team = team;
    this.pld = pld;
    this.w = w;
    this.d = d;
    this.l = l;
    this.gf = gf;
    this.ga = ga;
    this.gd = gd;
    this.pts = pts;
  }

  get_json() {
    return {
      team: this.team == null ? '': this.team,
      pld: this.pld == null ? '' : this.pld,
      w: this.w == null ? '' : this.w,
      d: this.d == null ? '' : this.d,
      l: this.l == null ? '' : this.l,
      gf: this.gf == null ? '' : this.gf,
      ga: this.ga == null ? '' : this.ga,
      gd: this.gd == null ? '' : this.gd,
      pts: this.pt == null ? '' : this.pts
    };
  }
}
