import { useState, useEffect } from "react";
import { fetchWithAuth } from "@/shared/api/fetchClient";
// --- Icons ---
const SettingsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.1"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.1989 2.58701C11.4439 2.45095 11.7196 2.37955 11.9999 2.37955C12.2802 2.37955 12.5559 2.45095 12.8009 2.58701L20.0009 6.58702C20.5249 6.87802 20.8499 7.43002 20.8499 8.03001V15.97C20.8499 16.57 20.5249 17.122 20.0009 17.413L12.8009 21.413C12.5559 21.5491 12.2802 21.6205 11.9999 21.6205C11.7196 21.6205 11.4439 21.5491 11.1989 21.413L3.9989 17.413C3.74153 17.2701 3.52707 17.0609 3.37779 16.8072C3.2285 16.5535 3.14982 16.2644 3.1499 15.97V8.03001C3.1499 7.43002 3.4749 6.87802 3.9989 6.58702L11.1989 2.58701ZM12.0729 3.89901C12.0506 3.88658 12.0255 3.88005 11.9999 3.88005C11.9744 3.88005 11.9492 3.88658 11.9269 3.89901L4.7269 7.89902C4.70371 7.91193 4.68437 7.93077 4.67084 7.95361C4.65731 7.97645 4.65009 8.00247 4.6499 8.02902V15.971C4.6499 16.025 4.6799 16.075 4.7269 16.101L11.9269 20.101C11.9492 20.1134 11.9744 20.12 11.9999 20.12C12.0255 20.12 12.0506 20.1134 12.0729 20.101L19.2729 16.101C19.2961 16.0881 19.3154 16.0693 19.329 16.0464C19.3425 16.0236 19.3497 15.9976 19.3499 15.971V8.03001C19.3499 8.0033 19.3428 7.97707 19.3292 7.95404C19.3157 7.93101 19.2962 7.91202 19.2729 7.89902L12.0729 3.89901Z"
      fill="#033438"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.25 12C7.25 10.7402 7.75045 9.53204 8.64124 8.64124C9.53204 7.75045 10.7402 7.25 12 7.25C13.2598 7.25 14.468 7.75045 15.3588 8.64124C16.2496 9.53204 16.75 10.7402 16.75 12C16.75 13.2598 16.2496 14.468 15.3588 15.3588C14.468 16.2496 13.2598 16.75 12 16.75C10.7402 16.75 9.53204 16.2496 8.64124 15.3588C7.75045 14.468 7.25 13.2598 7.25 12ZM12 8.75C11.138 8.75 10.3114 9.09241 9.7019 9.7019C9.09241 10.3114 8.75 11.138 8.75 12C8.75 12.862 9.09241 13.6886 9.7019 14.2981C10.3114 14.9076 11.138 15.25 12 15.25C12.862 15.25 13.6886 14.9076 14.2981 14.2981C14.9076 13.6886 15.25 12.862 15.25 12C15.25 11.138 14.9076 10.3114 14.2981 9.7019C13.6886 9.09241 12.862 8.75 12 8.75Z"
      fill="#033438"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 32 32"
    className="w-7 h-7 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.1"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.3332 10C10.3332 9.25585 10.4797 8.51898 10.7645 7.83147C11.0493 7.14396 11.4667 6.51927 11.9929 5.99307C12.5191 5.46687 13.1438 5.04947 13.8313 4.76469C14.5188 4.47992 15.2557 4.33334 15.9998 4.33334C16.744 4.33334 17.4809 4.47992 18.1684 4.76469C18.8559 5.04947 19.4806 5.46687 20.0068 5.99307C20.533 6.51927 20.9504 7.14396 21.2352 7.83147C21.5199 8.51898 21.6665 9.25585 21.6665 10C21.6665 11.5029 21.0695 12.9442 20.0068 14.0069C18.9441 15.0697 17.5027 15.6667 15.9998 15.6667C14.4969 15.6667 13.0556 15.0697 11.9929 14.0069C10.9302 12.9442 10.3332 11.5029 10.3332 10ZM15.9998 6.33334C15.0274 6.33334 14.0947 6.71965 13.4071 7.40728C12.7195 8.09492 12.3332 9.02755 12.3332 10C12.3332 10.9725 12.7195 11.9051 13.4071 12.5927C14.0947 13.2804 15.0274 13.6667 15.9998 13.6667C16.9723 13.6667 17.9049 13.2804 18.5926 12.5927C19.2802 11.9051 19.6665 10.9725 19.6665 10C19.6665 9.02755 19.2802 8.09492 18.5926 7.40728C17.9049 6.71965 16.9723 6.33334 15.9998 6.33334ZM10.6665 19.6667C9.87085 19.6667 9.10779 19.9827 8.54518 20.5454C7.98257 21.108 7.6665 21.871 7.6665 22.6667V24.2507C7.6665 24.2747 7.68384 24.296 7.70784 24.3C13.1998 25.196 18.8012 25.196 24.2918 24.3C24.3032 24.2974 24.3133 24.2912 24.3208 24.2823C24.3282 24.2734 24.3326 24.2623 24.3332 24.2507V22.6667C24.3332 21.871 24.0171 21.108 23.4545 20.5454C22.8919 19.9827 22.1288 19.6667 21.3332 19.6667H20.8798C20.8442 19.6673 20.8087 19.6727 20.7745 19.6827L19.6212 20.06C17.2681 20.8284 14.7316 20.8284 12.3785 20.06L11.2238 19.6827C11.1905 19.6729 11.1559 19.6675 11.1212 19.6667H10.6665ZM5.6665 22.6667C5.6665 21.3406 6.19329 20.0688 7.13097 19.1311C8.06865 18.1935 9.34042 17.6667 10.6665 17.6667H11.1198C11.3687 17.6676 11.6105 17.7058 11.8452 17.7813L12.9998 18.1587C14.9492 18.7951 17.0505 18.7951 18.9998 18.1587L20.1545 17.7813C20.3878 17.7053 20.6332 17.6667 20.8785 17.6667H21.3332C22.6593 17.6667 23.931 18.1935 24.8687 19.1311C25.8064 20.0688 26.3332 21.3406 26.3332 22.6667V24.2507C26.3332 25.256 25.6052 26.112 24.6132 26.2733C18.9087 27.2045 13.091 27.2045 7.3865 26.2733C6.90675 26.1944 6.47057 25.9478 6.1556 25.5774C5.84063 25.207 5.66732 24.7369 5.6665 24.2507V22.6667Z"
      fill="#033438"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 32 32"
    className="w-7 h-7 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.1"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.78644 13.1413C10.1745 18.339 14.4167 22.458 19.6824 24.692L19.6984 24.6987L20.7171 25.152C21.3463 25.4326 22.0529 25.4881 22.7182 25.3091C23.3835 25.1302 23.9669 24.7277 24.3704 24.1693L26.0691 21.8187C26.119 21.7494 26.1405 21.6637 26.1291 21.5791C26.1177 21.4945 26.0743 21.4175 26.0078 21.364L23.0424 18.9707C23.0074 18.9424 22.9671 18.9216 22.9238 18.9094C22.8806 18.8971 22.8353 18.8938 22.7907 18.8995C22.7461 18.9052 22.7031 18.9199 22.6644 18.9427C22.6256 18.9655 22.5918 18.9959 22.5651 19.032L21.4104 20.5893C21.2744 20.7731 21.0795 20.9046 20.8583 20.9622C20.637 21.0196 20.4027 20.9996 20.1944 20.9053C16.2501 19.1168 13.0897 15.9564 11.3011 12.012C11.2069 11.8037 11.1868 11.5694 11.2443 11.3482C11.3018 11.1269 11.4334 10.932 11.6171 10.796L13.1731 9.64001C13.2093 9.61329 13.2396 9.57952 13.2624 9.54076C13.2852 9.50199 13.2999 9.45902 13.3056 9.41442C13.3113 9.36983 13.308 9.32454 13.2958 9.28128C13.2835 9.23801 13.2627 9.19767 13.2344 9.16267L10.8424 6.19734C10.7889 6.13085 10.7119 6.08742 10.6273 6.07601C10.5427 6.0646 10.457 6.08607 10.3878 6.13601L8.02378 7.84267C7.46164 8.24815 7.05725 8.83576 6.87933 9.50565C6.7014 10.1755 6.76092 10.8864 7.04778 11.5173L7.78644 13.1413ZM18.8931 26.5293C13.1722 24.0996 8.56367 19.6227 5.96911 13.9747L5.96644 13.972L5.22778 12.3453C4.74967 11.2939 4.65032 10.1094 4.94661 8.99303C5.2429 7.87666 5.91655 6.8973 6.85311 6.22134L9.21711 4.51467C9.70128 4.16524 10.301 4.01471 10.8928 4.09408C11.4846 4.17345 12.0235 4.47668 12.3984 4.94134L14.7918 7.90801C14.9893 8.15277 15.1353 8.43494 15.221 8.73755C15.3067 9.04017 15.3303 9.35698 15.2904 9.66896C15.2506 9.98094 15.1481 10.2816 14.989 10.553C14.83 10.8243 14.6178 11.0608 14.3651 11.248L13.4718 11.9093C14.9827 14.8374 17.3677 17.2224 20.2958 18.7333L20.9584 17.84C21.1457 17.5875 21.382 17.3754 21.6533 17.2166C21.9245 17.0577 22.2251 16.9552 22.5369 16.9154C22.8487 16.8755 23.1653 16.8991 23.4678 16.9847C23.7703 17.0702 24.0524 17.216 24.2971 17.4133L27.2638 19.8067C27.7288 20.1817 28.0323 20.7208 28.1117 21.3129C28.191 21.9051 28.0403 22.5051 27.6904 22.9893L25.9918 25.3413C25.3194 26.2719 24.3472 26.9427 23.2386 27.2411C22.13 27.5395 20.9524 27.4473 19.9038 26.98L18.8931 26.5293Z"
      fill="#033438"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 32 32"
    className="w-7 h-7 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.1"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.73848 11.1373C3.36514 14.608 3.38114 18.6107 3.90114 22.068C4.04117 22.997 4.48956 23.8518 5.1742 24.4951C5.85885 25.1384 6.73995 25.5327 7.67581 25.6147L9.68914 25.788C13.8891 26.1533 18.1105 26.1533 22.3105 25.788L24.3238 25.6147C25.2597 25.5327 26.1408 25.1384 26.8254 24.4951C27.5101 23.8518 27.9584 22.997 28.0985 22.068C28.6185 18.6107 28.6345 14.608 28.2611 11.1373C28.213 10.7348 28.1588 10.3329 28.0985 9.93201C27.9584 9.00306 27.5101 8.1482 26.8254 7.50492C26.1408 6.86163 25.2597 6.4673 24.3238 6.38535L22.3105 6.21201C18.1117 5.84738 13.8892 5.84738 9.69048 6.21201L7.67714 6.38535C6.74104 6.46702 5.85963 6.86122 5.17472 7.50453C4.48981 8.14784 4.04123 9.00286 3.90114 9.93201C3.8407 10.3338 3.78648 10.7356 3.73848 11.1373ZM9.86248 8.20401C13.9458 7.84807 18.0524 7.84807 22.1358 8.20401L24.1491 8.37868C24.638 8.42135 25.0982 8.6272 25.4559 8.96312C25.8136 9.29903 26.0479 9.74549 26.1211 10.2307L26.1665 10.5413L18.7518 14.6613C17.91 15.129 16.9628 15.3745 15.9998 15.3745C15.0368 15.3745 14.0896 15.129 13.2478 14.6613L5.83314 10.5413L5.87848 10.2307C5.95166 9.74569 6.18577 9.2994 6.54318 8.9635C6.90059 8.62761 7.36055 8.42164 7.84914 8.37868L9.86248 8.20401ZM26.4105 12.6933C26.6708 15.7195 26.5737 18.7659 26.1211 21.7693C26.048 22.2543 25.8139 22.7006 25.4564 23.0365C25.099 23.3724 24.6391 23.5784 24.1505 23.6213L22.1371 23.796C18.0533 24.152 13.9463 24.152 9.86248 23.796L7.84914 23.6213C7.36055 23.5784 6.90059 23.3724 6.54318 23.0365C6.18577 22.7006 5.95166 22.2543 5.87848 21.7693C5.42545 18.7659 5.32789 15.7196 5.58781 12.6933L12.2758 16.4093C13.4148 17.0421 14.6962 17.3742 15.9991 17.3742C17.3021 17.3742 18.5835 17.0421 19.7225 16.4093L26.4105 12.6933Z"
      fill="#033438"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    viewBox="0 0 32 32"
    className="w-7 h-7 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.1"
  >
    <path
      d="M14 21.3333C14 20.8029 14.2107 20.2942 14.5858 19.9191C14.9609 19.544 15.4696 19.3333 16 19.3333C16.5304 19.3333 17.0391 19.544 17.4142 19.9191C17.7893 20.2942 18 20.8029 18 21.3333C18 21.8637 17.7893 22.3725 17.4142 22.7475C17.0391 23.1226 16.5304 23.3333 16 23.3333C15.4696 23.3333 14.9609 23.1226 14.5858 22.7475C14.2107 22.3725 14 21.8637 14 21.3333Z"
      fill="#033438"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.1629 14.1293L9.74152 10.344C9.68807 9.85879 9.68807 9.36919 9.74152 8.88399L9.77219 8.61066C9.94319 7.0785 10.673 5.66314 11.822 4.63524C12.9709 3.60735 14.4585 3.03906 16.0002 3.03906C17.5419 3.03906 19.0294 3.60735 20.1784 4.63524C21.3274 5.66314 22.0572 7.0785 22.2282 8.61066L22.2589 8.88399C22.3122 9.37021 22.3122 9.85688 22.2589 10.344L21.8375 14.1307L22.7535 14.2027C23.455 14.2585 24.1176 14.5478 24.6353 15.0244C25.153 15.5011 25.496 16.1375 25.6095 16.832C26.0975 19.813 26.0975 22.8536 25.6095 25.8347C25.496 26.5292 25.153 27.1656 24.6353 27.6422C24.1176 28.1189 23.455 28.4082 22.7535 28.464L20.7589 28.624C17.5909 28.8773 14.4095 28.8773 11.2415 28.624L9.24686 28.464C8.54535 28.4082 7.8828 28.1189 7.36507 27.6422C6.84735 27.1656 6.50434 26.5292 6.39086 25.8347C5.90292 22.8536 5.90292 19.813 6.39086 16.832C6.50434 16.1375 6.84735 15.5011 7.36507 15.0244C7.8828 14.5478 8.54535 14.2585 9.24686 14.2027L10.1629 14.1293ZM15.5015 5.06666C16.0603 5.00098 16.6265 5.04646 17.1676 5.20049C17.7088 5.35451 18.2141 5.61403 18.6545 5.96412C19.0949 6.3142 19.4618 6.74794 19.7339 7.24035C20.006 7.73277 20.1781 8.27415 20.2402 8.83332L20.2709 9.10666C20.3082 9.44532 20.3082 9.78488 20.2709 10.1253L19.8429 13.9787C17.2837 13.8144 14.7167 13.8144 12.1575 13.9787L11.7309 10.1253C11.6937 9.78678 11.6937 9.44519 11.7309 9.10666L11.7602 8.83332C11.8665 7.87514 12.2943 6.98121 12.9737 6.29722C13.6531 5.61322 14.5441 5.17947 15.5015 5.06666ZM20.6002 16.0387C17.5384 15.7945 14.462 15.7945 11.4002 16.0387L9.40686 16.1987C9.15081 16.2186 8.90887 16.3239 8.71981 16.4978C8.53075 16.6716 8.40552 16.9038 8.36419 17.1573C7.91147 19.9238 7.91147 22.7455 8.36419 25.512C8.40525 25.7657 8.53036 25.9983 8.71945 26.1724C8.90853 26.3465 9.15062 26.452 9.40686 26.472L11.4015 26.632C14.4629 26.876 17.5375 26.876 20.6002 26.632L22.5949 26.472C22.8509 26.4517 23.0926 26.346 23.2815 26.172C23.4703 25.9979 23.5952 25.7655 23.6362 25.512C24.0889 22.7455 24.0889 19.9238 23.6362 17.1573C23.5952 16.9038 23.4703 16.6714 23.2815 16.4973C23.0926 16.3233 22.8509 16.2176 22.5949 16.1973L20.6002 16.0387Z"
      fill="#033438"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    viewBox="0 0 32 32"
    className="w-7 h-7 shrink-0 text-forest-300"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.1"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11 16C11 14.6739 11.5268 13.4021 12.4645 12.4645C13.4021 11.5268 14.6739 11 16 11C17.3261 11 18.5979 11.5268 19.5355 12.4645C20.4732 13.4021 21 14.6739 21 16C21 17.3261 20.4732 18.5979 19.5355 19.5355C18.5979 20.4732 17.3261 21 16 21C14.6739 21 13.4021 20.4732 12.4645 19.5355C11.5268 18.5979 11 17.3261 11 16ZM16 13C15.2044 13 14.4413 13.3161 13.8787 13.8787C13.3161 14.4413 13 15.2044 13 16C13 16.7956 13.3161 17.5587 13.8787 18.1213C14.4413 18.6839 15.2044 19 16 19C16.7956 19 17.5587 18.6839 18.1213 18.1213C18.6839 17.5587 19 16.7956 19 16C19 15.2044 18.6839 14.4413 18.1213 13.8787C17.5587 13.3161 16.7956 13 16 13Z"
      fill="#033438"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.764 14.1947C5.20533 15 5 15.6307 5 16C5 16.3693 5.20533 17 5.764 17.8053C6.30533 18.5827 7.108 19.4267 8.124 20.2067C10.16 21.7693 12.9507 23 16 23C19.0493 23 21.84 21.7693 23.876 20.2067C24.892 19.4267 25.6947 18.5827 26.236 17.8053C26.7947 17 27 16.3693 27 16C27 15.6307 26.7947 15 26.236 14.1947C25.6947 13.4173 24.892 12.5733 23.876 11.7933C21.84 10.2307 19.0493 9 16 9C12.9507 9 10.16 10.2307 8.124 11.7933C7.108 12.5733 6.30533 13.4173 5.764 14.1947ZM6.90533 10.2067C9.21333 8.436 12.4213 7 16 7C19.5787 7 22.7867 8.436 25.0933 10.2067C26.2493 11.0933 27.204 12.0827 27.8787 13.0547C28.5347 14 29 15.036 29 16C29 16.964 28.5333 18 27.8787 18.9453C27.204 19.9173 26.2493 20.9053 25.0947 21.7933C22.788 23.564 19.5787 25 16 25C12.4213 25 9.21333 23.564 6.90667 21.7933C5.75067 20.9067 4.796 19.9173 4.12133 18.9453C3.46667 18 3 16.964 3 16C3 15.036 3.46667 14 4.12133 13.0547C4.796 12.0827 5.75067 11.0947 6.90533 10.2067Z"
      fill="#033438"
    />
  </svg>
);

const CardIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-7 h-7 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.1"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.1842 4.912L12.0002 4.75L4.8162 4.912C4.17052 4.92682 3.54965 5.1636 3.05808 5.5825C2.56651 6.0014 2.23424 6.57685 2.1172 7.212C1.5358 10.3772 1.5358 13.6218 2.1172 16.787C2.23428 17.4223 2.56669 17.9979 3.05847 18.4168C3.55024 18.8357 4.17134 19.0724 4.8172 19.087L12.0002 19.25L19.1842 19.088C19.8299 19.0732 20.4507 18.8364 20.9423 18.4175C21.4339 17.9986 21.7661 17.4232 21.8832 16.788C22.4642 13.622 22.4642 10.378 21.8832 7.213C21.7661 6.57768 21.4337 6.00211 20.9419 5.58319C20.4501 5.16427 19.829 4.92759 19.1832 4.913M4.8502 6.412L12.0002 6.25L19.1502 6.412C19.7702 6.426 20.2952 6.873 20.4072 7.484C20.5605 8.31867 20.6712 9.15733 20.7392 10H3.2602C3.32753 9.15733 3.4382 8.31867 3.5922 7.484C3.6468 7.18798 3.80169 6.9198 4.0308 6.72457C4.25991 6.52933 4.54926 6.41895 4.8502 6.412ZM3.1812 12C3.1812 13.512 3.3182 15.023 3.5932 16.516C3.7052 17.126 4.2302 17.574 4.8502 17.588L12.0002 17.75L19.1502 17.588C19.451 17.5808 19.7401 17.4703 19.969 17.2751C20.1979 17.0799 20.3526 16.8119 20.4072 16.516C20.6822 15.023 20.8192 13.512 20.8192 12H3.1812Z"
      fill="#033438"
    />
  </svg>
);

const MapPinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-7 h-7 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.1"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.25 9C8.25 8.00544 8.64509 7.05161 9.34835 6.34835C10.0516 5.64509 11.0054 5.25 12 5.25C12.9946 5.25 13.9484 5.64509 14.6517 6.34835C15.3549 7.05161 15.75 8.00544 15.75 9C15.75 9.99456 15.3549 10.9484 14.6517 11.6517C13.9484 12.3549 12.9946 12.75 12 12.75C11.0054 12.75 10.0516 12.3549 9.34835 11.6517C8.64509 10.9484 8.25 9.99456 8.25 9ZM12 6.75C11.4033 6.75 10.831 6.98705 10.409 7.40901C9.98705 7.83097 9.75 8.40326 9.75 9C9.75 9.59674 9.98705 10.169 10.409 10.591C10.831 11.0129 11.4033 11.25 12 11.25C12.5967 11.25 13.169 11.0129 13.591 10.591C14.0129 10.169 14.25 9.59674 14.25 9C14.25 8.40326 14.0129 7.83097 13.591 7.40901C13.169 6.98705 12.5967 6.75 12 6.75Z"
      fill="#033438"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.4562 8.127C5.58823 6.5252 6.31784 5.03163 7.50014 3.94288C8.68244 2.85413 10.231 2.24984 11.8382 2.25H12.1622C13.7694 2.24984 15.318 2.85413 16.5003 3.94288C17.6826 5.03163 18.4122 6.5252 18.5442 8.127C18.6904 9.90726 18.1405 11.6749 17.0102 13.058L13.4152 17.455C13.2437 17.6646 13.0279 17.8335 12.7832 17.9495C12.5384 18.0655 12.271 18.1257 12.0002 18.1257C11.7294 18.1257 11.462 18.0655 11.2172 17.9495C10.9725 17.8335 10.7566 17.6646 10.5852 17.455L6.9902 13.058C5.86013 11.6751 5.31026 9.90793 5.4562 8.128M11.8382 3.751C10.6075 3.75085 9.42176 4.21354 8.51642 5.04719C7.61108 5.88083 7.05236 7.02447 6.9512 8.251C6.83664 9.64417 7.2668 11.0275 8.1512 12.11L11.7462 16.506C11.8772 16.666 12.1232 16.666 12.2542 16.506L15.8492 12.11C16.7336 11.0275 17.1638 9.64417 17.0492 8.251C16.948 7.02447 16.3893 5.88083 15.484 5.04719C14.5786 4.21354 13.3929 3.75085 12.1622 3.751H11.8382Z"
      fill="#033438"
    />
    <path
      d="M7.66995 16.335C7.71983 16.2465 7.7512 16.1488 7.76216 16.0477C7.77312 15.9467 7.76343 15.8445 7.73369 15.7474C7.70396 15.6502 7.65478 15.5601 7.58916 15.4825C7.52354 15.4049 7.44283 15.3415 7.35194 15.296C7.26106 15.2506 7.16189 15.2241 7.06045 15.2181C6.95901 15.2122 6.85742 15.2269 6.76184 15.2614C6.66627 15.2959 6.5787 15.3495 6.50446 15.4189C6.43022 15.4883 6.37085 15.572 6.32995 15.665L4.32995 19.665C4.2729 19.7793 4.24598 19.9062 4.25174 20.0338C4.25749 20.1614 4.29574 20.2854 4.36284 20.3941C4.42994 20.5027 4.52369 20.5925 4.63518 20.6548C4.74668 20.7171 4.87224 20.7498 4.99995 20.75H19C19.1277 20.7498 19.2532 20.7171 19.3647 20.6548C19.4762 20.5925 19.57 20.5027 19.6371 20.3941C19.7042 20.2854 19.7424 20.1614 19.7482 20.0338C19.7539 19.9062 19.727 19.7793 19.67 19.665L17.67 15.665C17.6291 15.572 17.5697 15.4883 17.4954 15.4189C17.4212 15.3495 17.3336 15.2959 17.2381 15.2614C17.1425 15.2269 17.0409 15.2122 16.9395 15.2181C16.838 15.2241 16.7388 15.2506 16.648 15.296C16.5571 15.3415 16.4764 15.4049 16.4107 15.4825C16.3451 15.5601 16.2959 15.6502 16.2662 15.7474C16.2365 15.8445 16.2268 15.9467 16.2377 16.0477C16.2487 16.1488 16.2801 16.2465 16.33 16.335L17.787 19.25H6.21395L7.66995 16.335Z"
      fill="#033438"
    />
  </svg>
);

const PencilIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-7 h-7 text-silver-100 hover:text-forest-300 transition-colors cursor-pointer"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.1"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.1368 3.47001C14.9962 3.32956 14.8056 3.25067 14.6068 3.25067C14.4081 3.25067 14.2175 3.32956 14.0768 3.47001L4.88383 12.662C4.78984 12.7561 4.72254 12.8734 4.68883 13.002L3.68883 16.832C3.65582 16.9586 3.65648 17.0916 3.69076 17.2178C3.72503 17.3441 3.79173 17.4591 3.88422 17.5516C3.97671 17.6441 4.09179 17.7108 4.21802 17.7451C4.34425 17.7794 4.47726 17.78 4.60383 17.747L8.43183 16.747C8.56091 16.7132 8.67862 16.6455 8.77283 16.551L17.9648 7.35901C18.1053 7.21839 18.1842 7.02776 18.1842 6.82901C18.1842 6.63026 18.1053 6.43964 17.9648 6.29901L15.1368 3.47001ZM6.08783 13.579L14.6068 5.06101L16.3738 6.82801L7.85583 15.347L5.46283 15.972L6.08783 13.579Z"
      fill="#828282"
    />
    <path
      d="M4 19.25C3.80109 19.25 3.61032 19.329 3.46967 19.4697C3.32902 19.6103 3.25 19.8011 3.25 20C3.25 20.1989 3.32902 20.3897 3.46967 20.5303C3.61032 20.671 3.80109 20.75 4 20.75H19C19.1989 20.75 19.3897 20.671 19.5303 20.5303C19.671 20.3897 19.75 20.1989 19.75 20C19.75 19.8011 19.671 19.6103 19.5303 19.4697C19.3897 19.329 19.1989 19.25 19 19.25H4Z"
      fill="#828282"
    />
  </svg>
);

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6 text-silver-100 hover:text-rose-500 transition-colors cursor-pointer"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.1"
  >
    <path
      d="M8.46387 15.5351L15.5359 8.46509M8.46387 8.46509L15.5359 15.5351"
      stroke="#828282"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

const SafeguardIcon = () => (
  <svg
    viewBox="0 0 28 28"
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.1"
  >
    <path
      d="M10.5 16C10.5 15.6022 10.658 15.2206 10.9393 14.9393C11.2206 14.658 11.6022 14.5 12 14.5C12.3978 14.5 12.7794 14.658 13.0607 14.9393C13.342 15.2206 13.5 15.6022 13.5 16C13.5 16.3978 13.342 16.7794 13.0607 17.0607C12.7794 17.342 12.3978 17.5 12 17.5C11.6022 17.5 11.2206 17.342 10.9393 17.0607C10.658 16.7794 10.5 16.3978 10.5 16Z"
      fill="#079941"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.62202 10.597L7.30602 7.75799C7.26593 7.39409 7.26593 7.02689 7.30602 6.66299L7.32902 6.45799C7.45727 5.30887 8.0046 4.24735 8.86634 3.47643C9.72809 2.70551 10.8438 2.2793 12 2.2793C13.1563 2.2793 14.272 2.70551 15.1337 3.47643C15.9954 4.24735 16.5428 5.30887 16.671 6.45799L16.694 6.66299C16.734 7.02766 16.734 7.39266 16.694 7.75799L16.378 10.598L17.065 10.652C17.5911 10.6938 18.0881 10.9108 18.4764 11.2683C18.8647 11.6258 19.1219 12.1031 19.207 12.624C19.573 14.8598 19.573 17.1402 19.207 19.376C19.1219 19.8969 18.8647 20.3742 18.4764 20.7317C18.0881 21.0891 17.5911 21.3061 17.065 21.348L15.569 21.468C13.193 21.658 10.807 21.658 8.43102 21.468L6.93502 21.348C6.40889 21.3061 5.91198 21.0891 5.52368 20.7317C5.13539 20.3742 4.87813 19.8969 4.79302 19.376C4.42707 17.1402 4.42707 14.8598 4.79302 12.624C4.87813 12.1031 5.13539 11.6258 5.52368 11.2683C5.91198 10.9108 6.40889 10.6938 6.93502 10.652L7.62202 10.597ZM11.626 3.79999C12.0451 3.75074 12.4698 3.78485 12.8756 3.90037C13.2815 4.01588 13.6604 4.21053 13.9908 4.47309C14.3211 4.73565 14.5962 5.06095 14.8003 5.43026C15.0044 5.79958 15.1335 6.20561 15.18 6.62499L15.203 6.82999C15.231 7.08399 15.231 7.33866 15.203 7.59399L14.882 10.484C12.9627 10.3608 11.0374 10.3608 9.11802 10.484L8.79802 7.59399C8.77014 7.34009 8.77014 7.0839 8.79802 6.82999L8.82002 6.62499C8.89979 5.90635 9.22058 5.23591 9.73013 4.72291C10.2397 4.20991 10.9079 3.8846 11.626 3.79999ZM15.45 12.029C13.1537 11.8459 10.8464 11.8459 8.55002 12.029L7.05502 12.149C6.86298 12.164 6.68153 12.2429 6.53974 12.3733C6.39794 12.5037 6.30402 12.6779 6.27302 12.868C5.93348 14.9429 5.93348 17.0591 6.27302 19.134C6.30382 19.3243 6.39765 19.4987 6.53946 19.6293C6.68127 19.7598 6.86284 19.839 7.05502 19.854L8.55102 19.974C10.847 20.157 13.153 20.157 15.45 19.974L16.946 19.854C17.138 19.8388 17.3194 19.7595 17.461 19.629C17.6026 19.4984 17.6963 19.3241 17.727 19.134C18.0666 17.0591 18.0666 14.9429 17.727 12.868C17.6963 12.6779 17.6026 12.5035 17.461 12.373C17.3194 12.2424 17.138 12.1632 16.946 12.148L15.45 12.029Z"
      fill="#079941"
    />
  </svg>
);

interface FieldProps {
  label?: string;
  icon?: React.ReactNode;
  value: string;
  type?: string;
  readOnly: boolean;
  trailing?: React.ReactNode;
  isEditingList?: boolean;
  isMasked?: boolean;
  error?: string;
  isInvalid?: boolean;
  placeholder?: string;
  hideEditIcon?: boolean;
  onChange?: (val: string) => void;
  onBlur?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

const Field = ({
  label,
  icon,
  value,
  type = "text",
  readOnly,
  trailing,
  isEditingList = false,
  isMasked = false,
  error,
  isInvalid = false,
  placeholder,
  hideEditIcon = false,
  onChange,
  onBlur,
  onEditClick,
  onDeleteClick,
}: FieldProps) => {
  const actualType = isMasked && !readOnly ? "password" : type;
  const displayValue = isMasked && readOnly ? "●".repeat(value.length) : value;

  return (
    <label className="block w-full">
      {label && (
        <span className="mb-[4px] ml-2 block text-headline-4 font-normal leading-none text-forest-300">
          {label}
        </span>
      )}
      <div
        className={`flex h-14 items-center gap-3 rounded-[16px] bg-rose-50 border-[1.5px] px-4 transition-colors duration-200 ${
          isInvalid && !readOnly
            ? "border-rose-300 ring-1 ring-rose-300"
            : "border-forest-400"
        }`}
      >
        {icon && <span className="text-forest-300 shrink-0">{icon}</span>}
        <input
          type={actualType}
          value={displayValue}
          readOnly={readOnly}
          onBlur={onBlur}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          className={`h-full min-w-0 w-full bg-transparent font-normal outline-none placeholder:text-silver-200 ${
            readOnly && isEditingList ? "text-silver-200" : "text-forest-300"
          } ${
            isMasked || actualType === "password"
              ? "text-headline-5 tracking-[0.09em] leading-none"
              : "text-headline-5"
          }`}
        />
        {trailing}

        {isEditingList && (
          <div className="flex items-center gap-3 ml-2 border-l border-silver-100/30 pl-3">
            {!hideEditIcon && (
              <button
                type="button"
                onClick={onEditClick}
                className="outline-none hover:text-forest-300 text-silver-100 transition-colors"
              >
                <PencilIcon />
              </button>
            )}
            <button
              type="button"
              onClick={onDeleteClick}
              className="outline-none hover:text-rose-400 text-silver-100 transition-colors"
            >
              <XIcon />
            </button>
          </div>
        )}
      </div>
      {isInvalid && !readOnly && error && (
        <span className="mt-1 ml-2 block text-[12px] text-rose-300 leading-none">
          {error}
        </span>
      )}
    </label>
  );
};

export const SettingsForm = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [editingGeneral, setEditingGeneral] = useState(false);
  const [editingPayments, setEditingPayments] = useState(false);
  const [editingAddresses, setEditingAddresses] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("********");
  const [showPassword, setShowPassword] = useState(false);

  const [initialData, setInitialData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "********",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  type PaymentCard = {
    id: string;
    number: string;
    expiry: string;
    cvv: string;
    name: string;
  };
  const [cards, setCards] = useState<PaymentCard[]>([]);

  type Address = { id: string; text: string };
  const [addresses, setAddresses] = useState<Address[]>([]);

  // Fetch all user data on component mount
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const [userRes, addressesRes, paymentsRes] = await Promise.all([
          fetchWithAuth("/api/v1/users/me"),
          fetchWithAuth("/api/v1/users/me/addresses"),
          fetchWithAuth("/api/v1/users/me/payment-methods"),
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setFullName(userData.full_name || "");
          setPhone(userData.phone_number || "");
          setEmail(userData.email || "");

          setInitialData({
            fullName: userData.full_name || "",
            phone: userData.phone_number || "",
            email: userData.email || "",
            password: "********",
          });
        }

        if (addressesRes.ok) {
          const addrData = await addressesRes.json();
          setAddresses(
            addrData.map((a: any) => {
              // Construct full address string for the UI
              let fullAddress = a.address_line;
              if (a.floor) fullAddress += `, ${a.floor} Floor`;
              if (a.apartment) fullAddress += `, Flat ${a.apartment}`;
              return { id: String(a.id), text: fullAddress };
            }),
          );
        }

        if (paymentsRes.ok) {
          const payData = await paymentsRes.json();
          setCards(
            payData.map((p: any) => ({
              id: String(p.id),
              // Pad with dummy characters so getMaskedCard logic works correctly
              number: "000000000000" + p.last_four_digits,
              expiry: p.expiry_date,
              cvv: "***",
              name: p.card_name,
            })),
          );
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [cardForm, setCardForm] = useState({ number: "", expiry: "", cvv: "" });
  const [cardTouched, setCardTouched] = useState<Record<string, boolean>>({});

  const formatCardNumber = (val: string) =>
    val
      .replace(/\D/g, "")
      .match(/.{1,4}/g)
      ?.join(" ") || val.replace(/\D/g, "");
  const formatExpiry = (val: string) =>
    val
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1/$2")
      .slice(0, 5);
  const getMaskedCard = (number: string) =>
    `●●●● ●●●● ●●●● ${number.slice(-4)}`;

  const validateCardNumber = (val: string) =>
    val.replace(/\s/g, "").length === 16 ? "" : "Must be 16 digits";
  const validateExpiry = (val: string) =>
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(val) ? "" : "Invalid format (MM/YY)";
  const validateCvv = (val: string) => (val.length >= 3 ? "" : "Invalid CVV");

  const cardErrors = {
    number: validateCardNumber(cardForm.number),
    expiry: validateExpiry(cardForm.expiry),
    cvv: validateCvv(cardForm.cvv),
  };
  const isCardFormValid =
    !cardErrors.number && !cardErrors.expiry && !cardErrors.cvv;

  const handleDeleteCard = async (id: string) => {
    try {
      if (id !== "new") {
        await fetchWithAuth(`/api/v1/users/me/payment-methods/${id}`, {
          method: "DELETE",
        });
      }
      setCards((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  };

  const handleEditCard = (card: PaymentCard) => {
    setCardForm({
      number: formatCardNumber(card.number),
      expiry: card.expiry,
      cvv: card.cvv,
    });
    setCardTouched({});
    setActiveCardId(card.id);
  };

  const handleAddCard = () => {
    setCardForm({ number: "", expiry: "", cvv: "" });
    setCardTouched({});
    setActiveCardId("new");
  };

  const handleSaveInlineCard = async () => {
    setCardTouched({ number: true, expiry: true, cvv: true });
    if (!isCardFormValid) return;

    const rawNumber = cardForm.number.replace(/\s/g, "");

    const payload = {
      card_name: "Bank Card",
      last_four_digits: rawNumber.slice(-4),
      expiry_date: cardForm.expiry,
    };

    try {
      if (activeCardId === "new") {
        const res = await fetchWithAuth("/api/v1/users/me/payment-methods", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const newCard = await res.json();
          setCards([
            ...cards,
            {
              id: String(newCard.id),
              number: "000000000000" + newCard.last_four_digits,
              expiry: newCard.expiry_date,
              cvv: "***",
              name: newCard.card_name,
            },
          ]);
        }
      } else {
        await fetchWithAuth(
          `/api/v1/users/me/payment-methods/${activeCardId}`,
          {
            method: "DELETE",
          },
        );

        const res = await fetchWithAuth("/api/v1/users/me/payment-methods", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const newCard = await res.json();
          setCards(
            cards.map((c) =>
              c.id === activeCardId
                ? {
                    ...c,
                    id: String(newCard.id),
                    number: "000000000000" + newCard.last_four_digits,
                    expiry: newCard.expiry_date,
                    cvv: "***",
                  }
                : c,
            ),
          );
        }
      }
      setActiveCardId(null);
    } catch (error) {
      console.error("Failed to save card:", error);
    }
  };

  const validateFullName = (val: string) => {
    if (!val.trim()) return "Full Name is required";
    if (val.trim().length < 2) return "Must be at least 2 characters";
    return "";
  };

  const validatePhone = (val: string) => {
    const cleanDigits = val.replace(/\D/g, "");
    if (
      cleanDigits.length > 0 &&
      (cleanDigits.length < 10 || cleanDigits.length > 15)
    )
      return "Invalid phone number";
    return "";
  };

  const validateEmail = (val: string) => {
    const emailRegex =
      /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;
    if (!val.trim()) return "E-mail is required";
    if (!emailRegex.test(val.trim())) return "Invalid e-mail format";
    return "";
  };

  const validatePassword = (val: string) => {
    if (!val) return "Password is required";
    if (val.length < 8) return "Must be at least 8 characters";
    return "";
  };

  const errors = {
    fullName: validateFullName(fullName),
    phone: validatePhone(phone),
    email: validateEmail(email),
    password: validatePassword(password),
  };

  const isFormValid =
    !errors.fullName && !errors.phone && !errors.email && !errors.password;

  const handleStartEdit = () => {
    setInitialData({ fullName, phone, email, password });
    setEditingGeneral(true);
  };

  const handleCancel = () => {
    setFullName(initialData.fullName);
    setPhone(initialData.phone);
    setEmail(initialData.email);
    setPassword(initialData.password);
    setTouched({});
    setEditingGeneral(false);
  };

  const handleSave = async () => {
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      password: true,
    });

    if (!isFormValid) return;

    try {
      const response = await fetchWithAuth("/api/v1/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          phone_number: phone || null,
        }),
      });

      if (response.ok) {
        setInitialData({ ...initialData, fullName, phone });
        setEditingGeneral(false);
        setTouched({});
      } else {
        console.error("Failed to update profile general settings");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const [activeAddressId, setActiveAddressId] = useState<string | null>(null);

  const handleEditAddressClick = (id: string) => {
    setActiveAddressId(id);
  };

  const handleAddressChange = (id: string, newText: string) => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === id ? { ...addr, text: newText } : addr)),
    );
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      if (!id.startsWith("new_")) {
        await fetchWithAuth(`/api/v1/users/me/addresses/${id}`, {
          method: "DELETE",
        });
      }

      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      if (activeAddressId === id) setActiveAddressId(null);
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  const handleAddAddress = () => {
    const newId = `new_${Date.now()}`;
    setAddresses([...addresses, { id: newId, text: "" }]);
    setActiveAddressId(newId);
  };

  const handleSaveAddresses = async () => {
    const validAddresses = addresses.filter((addr) => addr.text.trim() !== "");

    try {
      const updatedAddresses = await Promise.all(
        validAddresses.map(async (addr) => {
          if (addr.id.startsWith("new_")) {
            const res = await fetchWithAuth("/api/v1/users/me/addresses", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ address_line: addr.text }),
            });
            if (res.ok) {
              const saved = await res.json();
              return { id: String(saved.id), text: saved.address_line };
            }
          } else {
            const res = await fetchWithAuth(
              `/api/v1/users/me/addresses/${addr.id}`,
              {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address_line: addr.text }),
              },
            );
            if (res.ok) {
              return addr;
            }
          }
          return addr;
        }),
      );

      setAddresses(updatedAddresses);
      setActiveAddressId(null);
      setEditingAddresses(false);
    } catch (error) {
      console.error("Failed to save addresses:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64 text-forest-300">
        Loading profile data...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col font-montserrat">
      {/* 1. General Settings */}
      <section className="flex flex-col gap-5 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="flex items-center gap-2 text-headline-4 text-forest-300 font-normal">
            <SettingsIcon /> General Settings
          </h2>
          {!editingGeneral && (
            <button
              onClick={handleStartEdit}
              className="bg-rose-300 hover:bg-rose-200 text-rose-50 text-[12px]! px-8 py-1 rounded-full font-medium transition-colors"
            >
              Edit
            </button>
          )}
        </div>

        <div className="pl-6 flex flex-col gap-3 mb-8">
          <div className="inline-block border-2 border-info text-info rounded-[8px] px-8 py-1.5 text-[13px] font-medium w-max">
            Personal Account
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <Field
              label="Full Name"
              icon={<UserIcon />}
              value={fullName}
              readOnly={!editingGeneral}
              error={errors.fullName}
              isInvalid={Boolean(touched.fullName && errors.fullName)}
              onChange={setFullName}
              onBlur={() => markTouched("fullName")}
            />
            <Field
              label="Phone number"
              type="tel"
              icon={<PhoneIcon />}
              value={phone}
              readOnly={!editingGeneral}
              error={errors.phone}
              isInvalid={Boolean(touched.phone && errors.phone)}
              onChange={setPhone}
              onBlur={() => markTouched("phone")}
            />
            <Field
              label="E-mail"
              type="email"
              icon={<MailIcon />}
              value={email}
              readOnly={!editingGeneral}
              error={errors.email}
              isInvalid={Boolean(touched.email && errors.email)}
              onChange={(val) => setEmail(val.replace(/\s/g, ""))}
              onBlur={() => markTouched("email")}
            />
            <Field
              label="Password"
              type="text"
              icon={<LockIcon />}
              value={password}
              readOnly={!editingGeneral}
              isMasked={!showPassword}
              error={errors.password}
              isInvalid={Boolean(touched.password && errors.password)}
              onChange={setPassword}
              onBlur={() => markTouched("password")}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="cursor-pointer text-forest-300 transition-opacity hover:opacity-70"
                >
                  <EyeIcon />
                </button>
              }
            />
          </div>

          {/* Action Buttons for General Settings */}
          {editingGeneral && (
            <div className="flex gap-4 mt-2 max-w-[496px]">
              <button
                onClick={handleSave}
                disabled={!isFormValid && Object.keys(touched).length > 0}
                className="flex-1 text-headline-4 bg-rose-50 hover:bg-forest-300/80 hover:text-rose-50 text-forest-300 font-semibold! py-2.5 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="max-w-[224px] flex-1 border-2 border-rose-300 text-rose-300 hover:bg-rose-300 hover:text-rose-50 font-semibold! py-2.5 rounded-full transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. Saved Payment Methods */}
      <section className="flex flex-col gap-4 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="flex items-center gap-2 text-headline-4 text-forest-300 font-normal">
            <CardIcon /> Saved Payment Methods
          </h2>
          {!editingPayments && (
            <button
              onClick={() => setEditingPayments(true)}
              className="bg-rose-300 hover:bg-rose-200 text-rose-50 text-[12px]! px-8 py-1 rounded-full font-medium transition-colors"
            >
              Edit
            </button>
          )}
        </div>

        <div className="pl-6">
          <div className="flex items-center text-success text-[12px] font-medium mb-1">
            <SafeguardIcon /> All data is safeguarded
          </div>

          <div className="flex flex-col gap-4">
            {cards.map((card) => (
              <div key={card.id}>
                {editingPayments && activeCardId === card.id ? (
                  <div className="flex flex-col gap-4 mb-2">
                    <Field
                      label="Card Number"
                      icon={<CardIcon />}
                      value={cardForm.number}
                      readOnly={false}
                      onChange={(val) =>
                        setCardForm({
                          ...cardForm,
                          number: formatCardNumber(val),
                        })
                      }
                      onBlur={() =>
                        setCardTouched({ ...cardTouched, number: true })
                      }
                      error={cardErrors.number}
                      isInvalid={Boolean(
                        cardTouched.number && cardErrors.number,
                      )}
                    />
                    <div className="flex gap-4">
                      <Field
                        label="Expiry Date"
                        placeholder="MM/YY"
                        value={cardForm.expiry}
                        readOnly={false}
                        onChange={(val) =>
                          setCardForm({
                            ...cardForm,
                            expiry: formatExpiry(val),
                          })
                        }
                        onBlur={() =>
                          setCardTouched({ ...cardTouched, expiry: true })
                        }
                        error={cardErrors.expiry}
                        isInvalid={Boolean(
                          cardTouched.expiry && cardErrors.expiry,
                        )}
                      />
                      <Field
                        label="CVV"
                        type="text"
                        isMasked={true}
                        value={cardForm.cvv}
                        readOnly={false}
                        onChange={(val) =>
                          setCardForm({
                            ...cardForm,
                            cvv: val.replace(/\D/g, "").slice(0, 4),
                          })
                        }
                        onBlur={() =>
                          setCardTouched({ ...cardTouched, cvv: true })
                        }
                        error={cardErrors.cvv}
                        isInvalid={Boolean(cardTouched.cvv && cardErrors.cvv)}
                      />
                    </div>
                    <div className="flex gap-4 max-w-[496px]">
                      <button
                        onClick={handleSaveInlineCard}
                        className="flex-1 text-headline-4 bg-rose-50 hover:bg-forest-300/80 hover:text-rose-50 text-forest-300 font-semibold! py-2.5 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setActiveCardId(null)}
                        className="max-w-[224px] flex-1 border-2 border-rose-300 text-rose-300 hover:bg-rose-300 hover:text-rose-50 font-semibold! py-2.5 rounded-full transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <Field
                    icon={<CardIcon />}
                    value={card.name}
                    readOnly={true}
                    isEditingList={editingPayments && activeCardId === null}
                    onEditClick={() => handleEditCard(card)}
                    onDeleteClick={() => handleDeleteCard(card.id)}
                    trailing={
                      <span className="text-headline-5 tracking-[0.09em] text-forest-300 whitespace-nowrap">
                        {getMaskedCard(card.number)}
                      </span>
                    }
                  />
                )}
              </div>
            ))}

            {activeCardId === "new" && (
              <div className="flex flex-col gap-4 mb-2">
                <Field
                  label="Card Number"
                  icon={<CardIcon />}
                  value={cardForm.number}
                  readOnly={false}
                  onChange={(val) =>
                    setCardForm({ ...cardForm, number: formatCardNumber(val) })
                  }
                  onBlur={() =>
                    setCardTouched({ ...cardTouched, number: true })
                  }
                  error={cardErrors.number}
                  isInvalid={Boolean(cardTouched.number && cardErrors.number)}
                />
                <div className="flex gap-4">
                  <Field
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={cardForm.expiry}
                    readOnly={false}
                    onChange={(val) =>
                      setCardForm({ ...cardForm, expiry: formatExpiry(val) })
                    }
                    onBlur={() =>
                      setCardTouched({ ...cardTouched, expiry: true })
                    }
                    error={cardErrors.expiry}
                    isInvalid={Boolean(cardTouched.expiry && cardErrors.expiry)}
                  />
                  <Field
                    label="CVV"
                    type="text"
                    isMasked={true}
                    value={cardForm.cvv}
                    readOnly={false}
                    onChange={(val) =>
                      setCardForm({
                        ...cardForm,
                        cvv: val.replace(/\D/g, "").slice(0, 4),
                      })
                    }
                    onBlur={() => setCardTouched({ ...cardTouched, cvv: true })}
                    error={cardErrors.cvv}
                    isInvalid={Boolean(cardTouched.cvv && cardErrors.cvv)}
                  />
                </div>
                <div className="flex gap-4 max-w-[496px]">
                  <button
                    onClick={handleSaveInlineCard}
                    className="flex-1 text-headline-4 bg-rose-50 hover:bg-forest-300/80 hover:text-rose-50 text-forest-300 font-semibold! py-2.5 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setActiveCardId(null)}
                    className="max-w-[224px] flex-1 border-2 border-rose-300 text-rose-300 hover:bg-rose-300 hover:text-rose-50 font-semibold! py-2.5 rounded-full transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons for Payments */}
          {editingPayments && activeCardId === null && (
            <div className="flex flex-col gap-3 mt-4 w-full">
              <button
                onClick={handleAddCard}
                className="w-full bg-[#B3158E] hover:bg-[#9c127b] text-rose-50 font-semibold! py-3.5 rounded-full transition-colors text-headline-4"
              >
                Add New Payment Method
              </button>
              <button
                onClick={() => setEditingPayments(false)}
                className="w-full bg-rose-50 hover:bg-gray-50 text-forest-300 font-semibold! py-3.5 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-colors text-headline-4"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Saved Addresses */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="flex items-center gap-2 text-headline-4 text-forest-300 font-normal">
            <MapPinIcon /> Saved Addresses
          </h2>
          {!editingAddresses && (
            <button
              onClick={() => setEditingAddresses(true)}
              className="bg-rose-300 hover:bg-rose-200 text-rose-50 text-[12px]! px-8 py-1 rounded-full font-medium transition-colors"
            >
              Edit
            </button>
          )}
        </div>

        <div className="pl-6">
          <div className="flex flex-col gap-4">
            {addresses.map((address) => {
              const isActive =
                editingAddresses && activeAddressId === address.id;

              return (
                <Field
                  key={address.id}
                  value={address.text}
                  placeholder="Enter your address..."
                  readOnly={!isActive}
                  isEditingList={editingAddresses}
                  hideEditIcon={isActive}
                  onChange={(val) => handleAddressChange(address.id, val)}
                  onEditClick={() => handleEditAddressClick(address.id)}
                  onDeleteClick={() => handleDeleteAddress(address.id)}
                />
              );
            })}
          </div>

          {/* Action Buttons for Addresses[cite: 10] */}
          {editingAddresses && (
            <div className="flex flex-col gap-3 mt-4 w-full">
              <button
                onClick={handleAddAddress}
                className="w-full bg-[#B3158E] hover:bg-[#9c127b] text-rose-50 font-semibold! py-3.5 rounded-full transition-colors text-headline-4"
              >
                Add New Address
              </button>
              <button
                onClick={handleSaveAddresses}
                className="w-full bg-rose-50 hover:bg-gray-50 text-forest-300 font-semibold! py-3.5 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-colors text-headline-4"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
