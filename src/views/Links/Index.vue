<template>
  <div class="links w">
    <top-banner :bannerConfig="bannerConfig"></top-banner>
    <div class="links-container">
      <div class="links-title">
        <h2>技术支持</h2>
      </div>
      <div class="links-describe">
        <span>本网站搭建由以下提供技术支持</span>
      </div>
      <div class="links-category-box">
        <a
          :href="item.link"
          target="_blank"
          rel="noopener external nofollow noreferrer"
          class="links-category-item"
          v-for="item in dataMap.supportList"
        >
          <div class="links-category-icon">
            <img :src="item.icon" />
          </div>
          <div class="links-category-title">
            <span>{{ item.title }}</span>
          </div>
          <div class="links-category-describe">
            <span>{{ item.describe }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import TopBanner from "@/components/TopBanner/Index.vue";

const dataMap = reactive({
  supportList: [
    {
      title: "Vue",
      link: "https://cn.vuejs.org/",
      describe:
        "是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型...",
      icon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAhFBMVEX///+44Myw3cetyL+rsbjh4+XB5NIlsnY1tX0lOVQmPlUhOlNFV2lewJI+t4FCuINCu4Q9kHQ0P1s1SV6zub/f8edDvoU2VWGDzKg/pHs0PFuLlJ4rs3k5bGg1RV0ML0rp6+0vRFpteYY7hHDT699wxZ0+mXfr9vA3X2SZ1LdAq346d2zD7XyeAAABIklEQVR4Aa3RBbaDUAxF0Vt/aCh1N+rzn99Pgua77XqBLLIO/q7VFp2u6EH19EenLVroD5zwfN8PQqgw4B+eE4M+EMVElAzT0WgUjMHGAX9Nhwn/HUcAJgNi09mIBWDBiM2mxAYTsLmTEYsl/+2vgJXPX5YLGeDmUGsdsdnygd1+v+OP7UYHrJFrOxJyF4fj8SB3QMK1USCRnLZyhhzfnhISKGVrPWNU0ePrDJWzrnpJRyq96Ipn1K75qrftiG1v+YpXNNwdscdyxJYPYu4Ow8Uy4skjtk8ZEDtY/TUJOYHEug+rSlJHsKokzQjWPF81X3EOq06SJHkEyyQxESyqwLJJbARLkmgEyybRCJZNohEsm0QifKK1XrfwqSjC57IM/+0FV60eh/8r7TcAAAAASUVORK5CYII=`,
    },
    {
      title: "Vite",
      describe: "是一种新型前端构建工具，能够显著提升前端开发体验。",
      link: "https://vitejs.dev/",
      icon: `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzg3Nzc3Nzc3Nzc2NzU3Ny01Nf/AABEIAB8AIAMBEQACEQEDEQH/xAAZAAACAwEAAAAAAAAAAAAAAAAFBwEEBgP/xAAtEAABAwIEAwcFAQAAAAAAAAABAgMEBREABiExQVGREhQiI3GBsRUkQmGhE//EABsBAAICAwEAAAAAAAAAAAAAAAQFAwYAAgcB/8QALhEAAQMDAgMHAwUAAAAAAAAAAQACAwQRMQUhEkFRImFxobHR8AbB4RMUMoGS/9oADAMBAAIRAxEAPwBnzcyOU+c7GkwrhJ0UlzdPA2thjFQiWMPa5LXVz45Cx7PNSnMKZyLww412dF9sDXlbfFY+opKmgdGxjrcV8d1uoTegLKgEkYVd+qmL2X5BedQlQ8CDck+mE+lCor61kbnmw3NztYfmyNmY2OMkBRCza9UKozCi06xUvxqcc1Skbm1tNMdCfp7GQmUvuOVufRL+E81ZzjTe9Qe9sp86OLqt+SOPTfrjTTp+CTgOD6oSohD+1zCyVKnNMpLaiorccAAA9MKvqvSqmqInjsGRtJJJ/vbPRMNMcyJpackohOmiLGW6dSBoOZ4YpGlae7UatlOMHPcBk+3fZOX9lt0WyLS1R4SqlJF5EvVJO4RuOu/THTdRlbcU8ezWbfPDCSzHtWWoOuhwtUKVmaIC6FVyWR2WXLuMG17DiPb4tiywCLUaUxTC4Ozhj06+6Kpm73bkLvToS67WWICyVR4yQ5KVzPL329zyxXtFpYqCnlrWixlJ4B0Zfb3/AMphVScDN8/dMsAAAAWA2AxGkqnGLEHzVR/rNJWy2B3lvzGFHTxDhfkdv7wwZQ1P7eUE/wATsfBT08ojkBOOa55Qoxo9KAfH3j5/0kG9yCdk3/Xzc8ce11Q2WS0ezG7Dw+eS2q5v1ZNsDCOYCQy//9k=`,
    },
    {
      title: "Node.js",
      link: "https://nodejs.org/",
      describe:
        "是一个开源的、跨平台的运行时环境，有了它，开发人员可以使用JavaScript 创建各种服务器端工具和应用程序。",
      icon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFDElEQVR4AaXUA6wsXRbF8f9e+1T3M8a2PRMnY9u2bdvh2LatYKxgbHvu430v1+yurnP2V5X7zP5er+S3yj4pcYF58Tcee8+Xfv1J/3nu5x77z8d/6KF3bnEhNO6OL//Bo73Fi775iOu+9FuP/VPy9C0zrrGpX127n9J3elX1217l12yxY9Pm1GIcGnfHtQOemzo+VlXV32W6ERAcyabNvRIlbi6lfyfzDzYlNy3GoXF28suuvaC6zChL9lgDIACMI+kll7tRSglMTzJZLbdntTivc268/PLtqysMDkt6sxkiOGMC6Pd7lFwsRyHCKrB3ynTAzG7d4mx04kK50rS3yJeduTqXX/ipJ/3AjEsDwXniEsmdyIWNmyACLu+mn0j6IcSVW/R6lbc4Sl3tOTRnLfb/tp8pek+q+K+JWwGFjRjnSwTtuckREKWbWpSgRBRht0sp7UnJ31ZKzi0grIW6utaVLxPej/te4RbD2sTTT3hiMWYCwIzkTs5BlEKOoESoBYUw9FyT1j3pHiaihbraPzOzPUb6Ur2sygSAcSEJcBclglLKkSnktiLCSkAy3/Snqakvf/+vv9/883/+3dQWkW1TT96s7OuBBZNGshPeQiEK5AgEHF5cYHF11S69eVefMFNbuHt4UtBUDGYrzJkoZkYhKCUgygnzwZ6Zw0gqa/UggBBA5enIKDbWp/tQgGCyBDS5UErQMRPTCwuMRiMqE47RUVdmIDnuwoqzdriHeTBpcsnkHJTINLnhwMI8pgQYwo5Mu5Lh3hGeRD3Xo4yMSdPkTFMKhHF4aYEcGTMDEzmMwFBXKQnJsCM3InOGsz006VswGNRD6iazuLZCksCgIxcmQ10FILFxcbUSNEsVzVCYTXR9mmiYW1kEcyTHMXTCdnUlceRuQILkYtDU/PMfs3Tzk8WoI9OXcBPyhJQ25uWoKyxAHcNaEkwvz7AwV7OwMEQyJkkQjCJTuajM8JZMOEJdkQpSgAVyY251hUE9IiVjz/8XkYwgJngHxrAZITNcRnLRT06VhLoqyq2CPAhrODA3S5IwMxaXhszOruESkyQiWBvVVJ5IZhjgBuoqR6FRA1Vh/+z8xr+bjaQk/vPfeSJi4r/j+mhIUwquRPKEW0Jd1RqQbcTyYJ2Z+eXTnnZ9fcSBQ8u424Q3AcvDNZI7ddMgqSPW88ByGtnBQ4voDK+6qsTU3jlyDjAmGguj3HRvwq6w/VIkc9RVunRdz82v9tdXM2Zn+n7QNIU9++dx18SfYnGwWi2OVpq59UXU1exvqsX5/fmxcs6a5GLqwBzDusHMJr2JRx9anl+tSw61xcpyY2WoT970Zf8TxmdOfHhOjMG/pg5f3LcQHInMPtUyIj7b5MZaqCttytHiD2+8hmjskebcAPgzYCeexCWmZ5dZHdQX58Jm8Cc3v55benTdNN6ilIgW6uqohia3GNX5b03ON0bcF1g/4UZwGf+Ymh7nF23AALjvlqp/k91btv2jxRV2Xiq3OEpdnc1ltuz+xmW27d6C8YYTvh9zSyvMLa5iGOfIG3qpt3nHpq3faHE26up8rnXJK72aS416GF8DSO78fc8BJOPEx4UgIr661Kz11m346hbno3F2+vfKlLG/nxno/njcAmPP2nDI9PwCkgAoEXtaN3fZA3b6ltxiHBpnpxvsukbc4KpXLmzNhvE7PK4qt0f85+D0qESpcykPN3HVque/D8LaaWkxjosAqoYXqu5e6SUAAAAASUVORK5CYII=`,
    },
    {
      title: "GitHub",
      link: "https://github.com/",
      describe:
        "是一个开源的、跨平台的运行时环境，有了它，开发人员可以使用JavaScript 创建各种服务器端工具和应用程序。",
      icon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAb1BMVEX////4+Pi3ubtvcnZNUVU+Q0cpLjLr6+x3en0sMTYkKS59gIORk5aUl5n8/Pzw8PFTV1tbX2Pc3d5DSEzn5+g3PECLjpFKTlKFh4qxs7XCxMUwNTq/wcLh4uPV1tZzd3o/Q0jOz9CmqKpjZ2qfoaSrd37mAAABPUlEQVR4AW3TBZKEMBAF0B8GCHzcnbW5/xm30qEyknklcU/DgQpuYRTHUXgLFHw6SemkmcYrlcd8kRYlnlQ1PU0Fp434Qde75Qd+1FUQKiRZjyGfTGNjKhWMmSQXYO3Ibao3MlqBnSRzADhk/ycAdcqclSSHnEUD+KLt8KalMQMqpl3izU5jKxHQGCq8Ud80fq4VfuFZaIyQO4wVPEre5g+RrIAPJrkQSL8OPjv3htQmH8guU5uwgseeP7ITMYBnpdFgvlJPcx0zoLjjzS/FDrVRvH6xsqDYlLx29huRUaFx6YuI1mhKMbddf9trEzca7rmRk/FxpiRXiJO8FDBURyb4yfO7glC8TOpacmAc4ElMEWlc2oGckjwvYVFEB5wjouE6uLBwquypQym/scKrM4njElYaJy182q15aDj/oQMZkS8JH3IAAAAASUVORK5CYII=`,
    },
    {
      title: "NPM",
      link: "https://www.npmjs.com/",
      describe: "NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题。",
      icon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAFVBMVEXLAADaSEjnh4f////yv7/87+/gZmY8ie6OAAAALElEQVR4AWOgEWBUggMBsACTMRwoUCbg4uKKKsDAwDLyBBCBzMDABgpk2gAAdjAkZFFl2WsAAAAASUVORK5CYII=`,
    },
    {
      title: "VS Code",
      link: "https://code.visualstudio.com/",
      describe:
        "是一款由微软开发且跨平台的免费源代码编辑器。 该软件以扩展的方式支持语法高亮、代码自动补全（又称IntelliSense）、代码重构功...",
      icon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADZklEQVR4AWKgCWjYL8DdcWq/8LTr99W2fJmvAeClrIHbiKIoevvKfZGssXZfua/SN06XxCAws9fM1IbkMJqZRmnMsGaX21eifl7u/KyVWcE3+84cSYv3/PdnNBEy8FhhuYHGNRt1q4LyRcmbiSlyKWJQ5HHKG9YEtSsC/4LkTSuBRxCpC+ajftUmoqhZpsC8EkhF7nQs6Ba5e3kIdSsSp5oCPgpMxdKSOxGzcNewuNApdVO9RIE5yZ2Mabnjyle9qF2WlFQtCryzwlVqQTxDVgYxcN3ULDUTSYcS8MxcU2DkohDDZyEi/N2Mq1LF8moWuFhyH1csCAVCueMs0gAMnnsxxGI3Vrpp8OUBtbqrKJ+34ZswcsZiooMCp5KaMxt9JwVwwpdloHIhiKoFcVFJks7ND6v7mZzfUdEB9J+OYoCFaaBIM7gS+GYtroovT8XCJSFUzPsQjyPwS+GUuo/BUOJkmCKSlrYdgWdW4J0WlPG7Yo7Mu6lUI89HQlSRBlyG4zaJpKXrgAIsKpkS+ClRPheHAqPOyJOS/TMqOuBKDyV6Waaj5o+gaEJNA/4Zls/6oEn2DxZpQFJ6jnzoORYtTRsCz7RNkXxckezvLNKApBRPFaJ8WdB5KOg+1mGjyzKuLfDtOgK+mWZ4pjjicUEJx9tBia5jhyOHYzedJ83QJIvFOhCPh+XcV4Ujofa6dY8lR1ooEoBpZaQU+BoRHWDA0iF4p8SFZ1LwapxQou0ghA6nLP7thudsShhJAl9YpIHlk0OqLBWlpGjMVHvdfmipLWknzndKOi1fksDn1CgBloSIJEIBGyUTBbgMR8yCINpY4sYtoI6Phi63JJNFOigw8ZxFkkAQLycMpEqbNYpW6395awJtDuaB2pLMTyzSADAsfIbiiRCKx1k+Noyr0mKZSiIdLaT5QFC9G8r8yCINiIcr1vyxJMekBIuSMB2alIBkfohowZ1i7psctaSkYV9QuSsGS+KMqm8XuHPMvefguJOo36PAjirVgXuJuZPPkYeIKBpJPSdQQYFAWIeNe4tpGWjat9HI4gZSxwmUb4vxPpwSlgeNQMgAc68SFLCVQO2uoMwReOcqDxpvQgV4sFRToo4SNf8EnrKcyJN3kcD9Fusn8XcCzNXnF/B33L0vN+f9BIXpuIMaAMJ1njN1ef7EAAAAAElFTkSuQmCC`,
    },
    {
      title: "腾讯云",
      link: "https://cloud.tencent.com/",
      describe:
        "腾讯云，是腾讯推出的云端运算服务，发布全球云服务版图，构建覆盖全球的数据中心节点，在更多地区跟全球的合作伙伴共同构建，为中国...",
      icon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACNklEQVR4AezTA+wcQRTH8fkbQW0jrq2gCGvbtts4qWK7NqLatm3b5vnu9ZtkLpnsaXdrTPI57pvfWzwlIr/U/wZ+eQPO1jjJw2Csw1OEEMZzbMBg5KvvuMzwPngGSeElBn7P4CwsgsThgwcSx0Jkfo8GFkMMdzAKZY1jymI07kIMi741vCfEMB+5SY7PjdNwH7fh2XgK0ebZrEuzNPEcOW4fOtEeIs/htNzDdexHUzcNrIZoU1zUpylX6/jtGpilVr04gctq0euzauujOfxW2vYey6U0pmE9DmAjZqFGsuBCWANJIICZyEwSnIWZCEASWINC1vBSuAGxYS+KxAnPx3aIDTdQKhqehkMQLYIVaINa6IGDEMMtVDHCi+EkxHAQ3VALbbAcEYh2CGmKjTpAtBDaK2MZTU5GGKKdM8IvQQzTkRbnKrVHCKJ1UGy0EaLNTvGAtocHj1GVDcriFkQLY0CKB3Q2RNuo2OgNRCtvY0rq6vBKuA3RAuhqY0LKQ7Q3ygj3OxizqnhsCW/noN4P6kDwJ4hW0EZxdTyBaB60chBeEKJ9UpYJGGEj/JW5AVooJ2u5jFDmJBA6BqK9RtUEhQ3xHqJ9QEOH4VXxGqKNUQTm4j5Ee4XRKGEUNsMHiPYKDRwEl8Boy9W7j9zok90YHoiFRx25d0mtDHssc+7He5s8EAsPGlvHqx7uQaIIv6lWhbxG4fdwD3UTzXguhmMX4efMM/9Gr7ATI/F1yI2Tge8XjDpg1AEAsMEBDrhlyj8AAAAASUVORK5CYII=`,
    },
    {
      title: "Element Plus",
      link: "https://element-plus.org/",
      describe:
        "是一套为构建基于Vue 3 的组件库而设计的UI 组件库（UI Kit）。 它为开发者提供了一套丰富的UI 组件和扩展功能，帮助开发者快速构建高...",
      icon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAZlBMVEX////c6/+pz/+u0v9cqv/j7//s9P8Ajf8tmP86nP8AkP/G3/9DoP8glP90tP/u9v/5/P/Q5f+Qwv9YqP9pr/8mlv+byP8pl/9Mo//P5P+/2/+v0/84m//m8f/7/v+DvP+52P+VxP+Ll0nHAAAA5ElEQVR4Ac1SVWLFMAwr12VUXIb7X3KBcZrt97kNmyXvhcUP/lEII8dDrOckpSwPH56LsqobubZdP/iNbT2CiCDUPqit57YHT7OcqVyegq8b06o2+whEsVXVBPTHRybThvP4qTBs4/512rMS10+FCF/7o8e2kaXw6XLJZCECLoUkYpYpBpVLoUYmizwiZ4hR1XJtmVMhkSUPTKU7yfYElZ1wltkZMCyFgVazqatRRmmsJIMKka8VFjkJJvJ/Qx0BZ2s6VTL69okszIGsQWpKXB5FMKYTXBaeS5oaRH/Tubtb7/XkDZ+uDvZQKuAYAAAAAElFTkSuQmCC`,
    },
    {
      title: "DayJS",
      link: "https://day.js.org/",
      describe:
        "DayJS 是一个轻量的处理时间和日期的JavaScript库，和Moment.js 的 API 设计保持完全一样。",
      icon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAb1BMVEX/X0z/XUn/VD7/V0L/Wkb/VT//aln/3Nn/2dX/4d7/x8H/fG7/vrj/mY//Ujv/gXT/zMj/Tjf/SzL/sqv/uLH/WEP/nZT/j4T/7Ov/hHj/zsr/ZFL/Ph//dGX/1NH/5+X/8/H/qqP/pZz/RCn/bl4B693MAAAAtUlEQVR4AewPgwHDACysbfv/G7fqhjE24I3gD0hEvOunYAFQ3KMEoHzGDdOyHQJ0PWLHl8AKEYBsI4hM29srDD9O0izXqChFq7hugn2A2YZNF7f7hH5QoDEQM7FI/HLM4SzAyanju0DHZF6WCZCW5S6QuI4q2guaJPHSdZRw8VgjF0GB1irot7gbNwTcJsv24tpRjCtiJ8S8QXvMtDdt29N9R7y/uT8JwfmkgjI/BvX+IAKjAABRwgoJl0bnsAAAAABJRU5ErkJggg==`,
    },
  ],
});

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "Levi",
  text: "连接世界，友谊永恒",
};
</script>

<style lang="scss" scoped>
.links-container {
  background: var(--themeColor);
  border-radius: var(--themeRadius);
  padding: 20px;
}

.links-category-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.links-describe {
  padding: 0 0 10px 10px;
  color: #393939;
}

.links-category-item {
  background: #fff;
  padding: 10px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border-radius: var(--themeRadius);
  cursor: pointer;
  position: relative;
  padding-left: 45px;
  width: 26%;
  margin: 10px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    transition: all 0.3s;
  }
}

.links-category-icon {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
}

.links-category-title {
  font-size: 20px;
  padding: 5px 0;
  color: var(--balckTextColor);
}

.links-category-describe {
  color: #727272;
  font-size: 14px;
}

.links h1,
.links h2,
.links h3 {
  color: var(--balckTextColor);
  margin-left: 25px !important;
  position: relative;
  transition: all 0.4s;
  &:hover {
    transition: all 0.4s;
    transform: translateX(15px);
    color: var(--btnTagBgColor);
  }
}

.links h1::before,
.links h2::before,
.links h3::before {
  content: "";
  position: absolute;
  top: 0;
  left: -35px;
  width: 30px;
  height: 30px;
  background: url(../../assets/images/md/huojian.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  animation: hupjianMove 1.5s linear infinite;
}

@media (max-width: 1100px) {
  .links-category-item {
    width: 40%;
    transition: all 0.3s;
  }
}

@media (max-width: 1030px) {
  .links-container-box {
    justify-content: space-around !important;
  }
}

@media (max-width: 860px) {
  .links-category-item {
    width: 100%;
    transition: all 0.3s;
  }

  .links h2 {
    font-size: 22px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .links-describe {
    font-size: 15px;
  }

  .links-category-title {
    font-size: 18px;
  }

  .links-category-describe {
    font-size: 13px;
  }
}
</style>
