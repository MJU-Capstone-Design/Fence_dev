import React from "react";

const { InfoWindow } = require("react-google-maps");
class HelloInfo extends React.PureComponent {
  render() {
    console.log("infoData : ", this.props.infoData);
    var rank = this.props.infoData.rank[0];
    var grid = this.props.infoData.grid;
    var grid_avg = { cctv: 10.6, bell: 5.3, light: 56.8 };
    var phone = this.props.infoData.search.phone;

    var info = {
      crime: [],
      contact: phone,
      compare: [],
    };

    var crime = [
      { name: "강도", seq: rank["강도"] },
      { name: "살인", seq: rank["살인"] },
      { name: "절도", seq: rank["절도"] },
      { name: "폭력", seq: rank["폭력"] },
      { name: "성폭력", seq: rank["성폭력"] },
    ];
    crime.sort(function (a, b) {
      return a.seq > b.seq ? -1 : a.seq < b.seq ? 1 : 0;
    });
    for (var obj in crime) {
      if (obj.seq > 3) {
        info.crime.push(` <${obj.name}> `);
      } else {
      }
    }
    if (info.crime.length == 0) {
      info.crime.push(
        "5대범죄에서 안전한 지역 입니다!",
        <br />,
        "행운아시네요 :)"
      );
    } else {
      info.crime.push("범죄에 취약한 지역입니다!", <br />, "주의 하세요!!!");
    }

    if (grid_avg.cctv > grid.cctv) {
      info.compare.push(" <cctv> ");
    }
    if (grid_avg.bell > grid.bell) {
      info.compare.push(" <안전비상벨> ");
    }
    if (grid_avg.light > grid.light) {
      info.compare.push(" <보안등> ");
    }
    if (info.compare.length == 0) {
      info.compare.push(
        "부족한 안전시설이 없습니다!",
        <br />,
        "관할구청에 칭찬의 말 한마디 어떨까요?"
      );
    } else {
      info.compare.push(
        "의 수가 부족한 지역입니다!",
        <br />,
        "관할구청에 연락하세요"
      );
    }

    console.log(info);

    return (
      <InfoWindow onCloseClick={this.props.onCloseClick}>
        <div class="infoTag">
          <p>
            현재 이 지역은 {info.crime} <br />이 지역은 다른 지역들에 비해{" "}
            {info.compare} <br />
            연략처 : {info.contact}
          </p>
        </div>
      </InfoWindow>
    );
  }
}

export default HelloInfo;
