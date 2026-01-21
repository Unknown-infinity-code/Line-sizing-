function calculateDiameter(Q_hr, V) {
    const Q = Q_hr / 3600; // m3/s
    const D = Math.sqrt((4 * Q) / (Math.PI * V));
    return D * 1000; // mm
}

function getNearestNB(D_mm) {
    const NB_SIZES = [15, 20, 25, 32, 40, 50, 65, 80, 100, 125, 150, 200, 250, 300];
    return NB_SIZES.reduce((a, b) =>
        Math.abs(b - D_mm) < Math.abs(a - D_mm) ? b : a
    );
}

function calculate() {
    const Q = parseFloat(document.getElementById("flow").value);
    const Vs = parseFloat(document.getElementById("vsuction").value);
    const Vd = parseFloat(document.getElementById("vdischarge").value);
    const Vo = parseFloat(document.getElementById("voverflow").value);

    if ([Q, Vs, Vd, Vo].some(v => isNaN(v) || v <= 0)) {
        document.getElementById("result").innerHTML =
            "Please enter valid positive values for all fields.";
        return;
    }

    const Ds = calculateDiameter(Q, Vs);
    const Dd = calculateDiameter(Q, Vd);
    const Do = calculateDiameter(Q, Vo);

    document.getElementById("result").innerHTML = `
        <strong>Suction Line</strong><br>
        Diameter: ${Ds.toFixed(2)} mm<br>
        Selected Pipe: DN ${getNearestNB(Ds)}<br><br>

        <strong>Discharge Line</strong><br>
        Diameter: ${Dd.toFixed(2)} mm<br>
        Selected Pipe: DN ${getNearestNB(Dd)}<br><br>

        <strong>Overflow Line</strong><br>
        Diameter: ${Do.toFixed(2)} mm<br>
        Selected Pipe: DN ${getNearestNB(Do)}
    `;
}