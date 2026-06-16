'use strict';

// Безопасное чтение из localStorage (чтобы система не ломалась от багов кэша браузера)
function getStorageItem(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

const DEFAULT_SIGHTS = [
  { id: 'burabay', name: 'Озеро Бурабай', subtitle: 'Главный водоём парка', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFRUXGBUYGBcXGBoXGBcXFRUYFxYVGBUYHSggGBolGxcVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAADBAACBQYBBwj/xABHEAABAwIDBQYDBgIGCAcAAAABAAIRAyEEEjEFQVFhcQYTIoGRobHR8BQyQlLB8RXhFmJygrLSByMzQ1ODkqIkNFRjc5Oj/8QAGgEAAwEBAQEAAAAAAAAAAAAAAQIDAAQFBv/EAC0RAAICAQMCBAUFAQEAAAAAAAABAhEDEiExQVEEEyJhFJGhseGBwdHw8XFC/9oADAMBAAIRAxEAPwD6A2nuQ61JAo4wHUheVcVYj3XybxM9zUL1qIKTqYZMfaOcq+dFQaNaYmKKq6mjVihSVVY2xHJIC/Dyk6mFWo0r11FGpRNszAqYZLvwy6F+HQjhU6m0I4mB9kKJSw5W59jR6Wz+Szz0ZYzKosKrULgugZs9Ax2CACksysdw2OYxGIKRrGVoYvDXSbqUL0cclWxyzTM6pQlL18PAWo6kqmguuOQ5pQMVtIzZbGHMNCtTwomUc07Jp5EwRhQjXrQqNrI9ShKCcOVSLQkrKNrIj3ofcle92VVUTdlcxKu1i9ZTTtGlKe0Kk2LNolEZQK1sJg76LRbguSk8tFVjsw6OCJRhhY3Lfp4IqOwvJDU2NpSObq0EHulv18Ik34VUi2JKJnUqVwugwGGpgS6wH1ZIUqUFM1DbKDZWW5KqKV6ozGBbcohZSvU1IU2RWJCu2sdNVO4UGHXzbT7HtJ+5UngiUnqd2p3a2m+TXRHslesoFEptTtEhVjjTEcxFtAogpOWm2mCrFgT/AA6F80y+7PBWFFPFqp3a3kI3mlKNBPU6AS7GFNU3QoS8JZRZylWmQs7FtlbbzIS3d8kvwKD8QcriMHyWc/ASdF2+Iwkt0SWGwfiFlRYXF0K5pqzlKey3ExC8OyjwX06jhaYB8IBSeMwDTcALq8lpckPMR89bgI3K79nmJhdn/C+iG/Z17oeXIOpHD1MGqfZl2+K2W03AWLVwwBiEPVE2zMB2EQzgl0bcGCj09lk7lWMpE3FHLswC0MJgYXQU9kGdE/h9kQjLIwxgjIwuFtom6WFPBbVDA8k6zCBQc5MqopGVhcNxClTAAlarqIVHthUTnQrUbMirssLMxOEaLLfxOJAC57F1ZK68Vvk58jSM/E0Eg9hC0yZVauHXQoNEXJMyMqie+z8l6juLsNNrorMSkfsruCPRwxXhvNA9NY5DQxY4K32lqX7gTrdeOpcEFkgwuMkPNqhWFVZpaV6wHirJR6MRt9UazK/NGbWWUym7VXAcnSFbNQVVcPWW0O4phjnb1RIRs0G1EVuIWZncitzJqFs0hXncr5kjTY9EGfgmSBY13qCXBDzPP4VO8dvag42FSoYrVS4Ql2ue0xJhXZUdwXsk7kjj1CpDArEiCLqlQHVVbmVsrkwBdh3aJKrhMztFpnDu4IlHBO6JasazMp7OT+HpQmvsbhvVBhCeKdIWy4rsbY2KJ9upiBKVds0nW6IzZbYuCjpiwamMOxLImQszH7Uyuht027ZI3FLYnYw3G6aEYoWUpMz6+2nHkkauPcd5WnT2I6bi3FGf2eaRzVlKKJNSZzdXGJF+Kut2p2cqHQJDFdn6zTGVXjOJGUJCbMSEb7W2EF2y6v5CgHBVfyn0T3FietDn2lqiV/h9X8jlEfSa5HTGqNwCjosSNU6NlVPyOb5SCh4rBPsId0ymF8V5U10Z9LqXcQq4MPEsN+CxqxLTC6NmCfuB6bx5JfbOz3EA5L7zuVISceeBZJMxzU5o9JoOpVWYJ0wQvK+FewEkEDiuiOaPBJwY7TqACESnWabFYtN5Xr6pC6IyRJpmo9/BXaUg2rMJ6nTkIyy6QLHYxRqtlaNCFilhbfUJijilaGTUTlCjfpkK5jisanjOarWx3NWTJtGvVqgWVWibrEGLJKcZiwBqi5Ao1WtHFTKkmYgapvCnNJ3RKScmlY8EmezC9c+OKHX4o2zXh5yu8j81Jyk+ClJcgHVuqo6v1WvWwjQJWRiQBokc5RdMZRjJbFPtTuas3Ev5qlPEACCrMxSdTFcQn2t/BQbRISdau5JmrJuqxkTcTZG0idx9F59vdwPos+tjLLzB4szqnTFaNMYx3Aq324oTcSCrGs0cFtbRtKJ/EeqrWrh9gbxoocQ3gEN1Zv5fNHWDSL965qXxGMtovcXiBu91lV8baF0Q3Iy2Duxx4KLN+0KK1EdR9Lo7boOdkD4dwII15m3unXVYjgd+5Y2xdu4Ku0No1GXH3HWd0yu18lqYjDS3Kw5Ogt6Lz4uem3TfsdrUb22/6Y+3atNtRrgA5+jmyNP62/itRtMPb4YykRce381ze0dmVXVBNMk8QbFbGyNnVaM+IFp/BOnmuLFKUssrhszpyRioKpboYdsmnIdkvvgxu4b/ADXP9rqzZbSa0CBJ01Og9PiuwbzCQx2x6VWZbDuIV/EeG1QaxpJksWWpXNs4zYmy21KoEeHWJ/Xekdr0W94WsFgdQu7wuwKbIuTHOPghu7O04Mb4id3G64l4TMorbf8A6dHn42+dj522gZWlSdC1dubGNIZgcwO+NOq52pUIUZOV6Z7MotNXEbq1il86DRrcU3Spg6pvM0A06i7qJIkOQe7PFaeIwhawP3LONS6fHmkxZY4oPTaQIVHuhAfWhesryumDfJKSXA3QrwnKePAWW6oCZR6NRuhFk7yd0Lo7M0KGLkG9lp7NxIa0mAueIH4bckVlVwtxSuakFRaN+ti5BhIikXTdZ+ExsPkjTcVqmtSJBaYNrHTpPVc+WLTtcFcck1QnWoOFonogsfuXQ08RIWTjHSSYQhPcLViwddUe0BBrGNCh1a09V0N9SaPKzuCB3hlVc5RdMGQkh/AucXcFv+ECIB5wFytKvCNTxriYmyZgWxutwU3GigwhmLJahXsjMx+VuUGJNzy5KUrQ6Fdp4MtGoM8FgPw0kzK6zGbXpH8PhaJzF0QBcuPDfdfKdudqcQXy17GMfTBENsHizmtqmcxzNde4uAYvDwzSjyTyRVHWOwbBYuI8wovm+LonEvdXccOw1CXZXVmtInTwl0gREcoUTPxb7ENKKUsUR/JdPsPt3isPDW1MzBAyP8QgbuIF9xG7ouGp1E1RqA2JWcB4yfB9s2H/AKTqFQhtdhpG3iBzt6m0t912eC2nRqgGlVY+fyuBPpqvzK2rCcwuOcwhzHFpBkEEggjeCENUl7j+ln6ZUXwmn29x3dmn35vPiIbnAIiz4kddea6rs9/pPFmYtp/+Vg15uZ+o9E6yIGk+mKLMwO38PWbmpVWvHI382m48wqu2pmpFzbOG7zWeSK6hUJMZxlCk6O83neSB6TCyMb2YoVDLHlk7hcLMx2INQySSh0a7oidFySUcjbcV+5a3DbUFrdinfhqA9ZCVpdn6zDcfL1WvhNpuaMpNlatXdqHGFLJ4SMtlaDHxDW73NHBUqbmCm4teQNP0Rv4Rh9O6b6LBGNd+Y+qIzGu/MV048WlU4pkZZk3abPdq7Co/haRPWFiVNgNzeF8dV0jNpE6mUQYob2tPVo+MKEvCPVcXRWPiY1T3MCn2Zn8bnchCIzsxH3nPHlMekrpaWPH5fRHGNbvBVF4bbeTB518I5t3Zk/8AFjq35FD/AKN1pjM30K6sYlpXpxTRrbqm+Fh3B50uxyFTs5W5DnMo2G2XUptcHUs5POwHLmuoZimHRwPS6v3gKEvCpraT+gVmfVHJ4YVGugsIB1GvklMfSqE+ER1XaOZyBStahwHsuWXhJx3TLrOnyjhDg6s6acChubVFi0ruHbMnVo+CXq7IbwI9UKzLlB1Y+hw1WjVOjCVSkytvYV2D9jDmfNeM2awfg9SSrY5zJz0nItoVXGzD7JqlgK+5k9CF1rKYFsgjkAPgrjKDIp36n4yqucya0HMVMHiWie7PsfgV7gaNR7spaQTxXSV8QdQSOhd7ykztFrSRLZBAIFzLtJGoSObYypHDdptp+CrRFJoAexhe95Ey5wcWNAFwWiCHEayAYB4rtDSptFKlkfLZLy05m31yvMltQQJaQ7LfmF1HbHtDUxIqdzQc6mHZXPOUWpuBcc0yGksbIdGo5LnsdSc6ixtPD1i+WlzntcfE5oGYVA7KZvZwnSDuRVrcnNp8GYNqU2gN+ziwAk5HE2FyTBvrECNFE9hq1MtH/hpO8gmCd/4XfFeI6vYTcwgFdqEB9bkRpK6tRIK1xRBUQgZ3K7QhZgwqxqiNrIDiSo131uWpGsdZXgyDB3Hh57lv7J7Y16RIce9YbEOPi6h+s9ZXJl0KZ0ssUZqmjLLKPDPqGF7S4d8xVLbTDpaRy1gnoSlcX2jph0A1XDeWgx/3EH2XzYkotOs4bz9cFD4GK4b+Zb4t9Uj6HR2/SJ/2jmndmzt9SbLQo7ZI1e6P7Tj8F8yp4eq/SnUd0afVO4fZeL/DRcOsAejkkvCpcSfzGXiL5j9DvMXtG0txA6GpB/xLNqbWO95PRzj8HLMwmxce7/ctHV7B+q06PZLaD5hlK3/uD9FFRSdar/Uq5bXVfoefxtw0L/V3zVP42Tq0nqZ/xKO7K44GHNpjoX/o1ensti9+T/8AT/KmSg/9Bcv6hhm2BvafYe6M7bbW6Fw6OP6BIUuyeMcfvUfRxjyhG/ohiRrVYP8AlPPutUE+TXN9GHftskw2qT1Lv1S9Ta/E36n4IjuyOIGten/9Z/zImH7MYpt2YljTxaxwMeTk1w7/AN+QKn2f0/kUftgDUj68kant9w+49390uHwT52Vjmj/zk9Wv/V6r3G0v/Us82n/MUVJdPv8AgDjLr9vyLP7TVSIL6h6gu+KEztHUG946NcPg2E1Up7UGlZh6W+JSVTE7XH4Q7zp/q5PFJ9Pr+BG2ur+X5DjtZWFg6v6PV29psS7Q4jzDviSsl+1tpt+9Scf7gP8AhCEO0G0N+Hcf+TUH6KqhHsT8xr/DYft3EjfX8s3zQDt3FH/j+bnD2lZ/9JsYPvYV3/Q8fELw9q6w+9Re3+584TKEV0A8jfU1KW0sY/TvfOofhmTEY12oq+dQ/NYtPtmfzR1pz8Ci0u2jp/2rfOi6PZyPp7P5M2p919BTtb9tblzZxTtvnxGw0cZPAEDWxO7nm7NqkCoXZbNdDso1fkzS5whuv3om+5dPjNu4eu5r67ab3NBaHNZWpuynUSHG1yfVc/tdlMuL6TmkTOQh5cYknxOjMSYmTe51sZtK7/Zgtd180bmF7NYgAVcMypnbDS7NSyubaQ1uYAbrXFo4rNx2Cx7Wlrg9rqYzwHhgyNlrXNGYSGjww2SC4fmE2xG3nsAfTfndmMuJddogMkZZsBFzN92iy8TtitWcKjnvLjPinwjecrZgfsmclxRrMUsqbjA3Rn0N9xhRXxWLe15DrGZIk6u8R0Mb5UQKJM8b1RGujdbr+iVn2Vw6d+sqrRIca8K7bpIG/wBfX7K7ZS0Ghy6hPFLtJ5fJFk9UDUeOlUFUqGuI0leNrjgmUvYRo3NibTw7bV6Gfg5pM+bSY48F3GB2vs+B3VSlTt+ICmRxknh1XzXDOpk+J2XSJaSPad3Irr+yex8I901K9GqIgM8TX5pgQ12U/wDaeSnke1j4rukkdzS2cXgPDg5hvLCHSORmFVrQ0/dnqiUdnUqAPc02U51LAGk9YufNCfmJ1nrf3XEk58s9DaPQ0MJi2DWmD/e1RX4veGx6fJIUmu4DroinDzPiHp+pKjLGkysXe4picc+bEeQH6of26odXWO6B8l5iqbGSXOAA1kgafQSmH2nh3PyMq03PBAgOFydw/N5LtxY41wcuSbvkdoNgyAAeMCfVPfaKv5neqXpvtIiNx1Bnmr947j9b0ZwsEZBnVqhF59V6x54/XJALrXurN1+P0PNS0FNQfOfr4Jaq0HiOhcPgbImYxz+vZUzHijGJpSEmbPAMh9Tzdm/xTKv/AA5sQZPUNHuGpnPzQ3PKvFEZNGVjezmHqGXsDjpJuRv1V6ewaQbla6q1sRlFRwEARETEQtGUHF4+lSE1KjW8ibndYalWpdSDMPEdicO4zNQdH29IQf6Ftaf9XXrN6PIPq0jnuWxjO0OGptDnVWwdI8RMGDYcwUSnt3DEgCvTuCfvAaEAydxkixub8CmuPcRpGI7sM1xl1eqTxLiT6korOwFL/jVf+r5rXq9osKz71dnlLv8ACCkKvbvBjfUPRnzIWuIGo9QuF7F4dou6of7Xdu9MzDHRJ4mhs2kXA12lzQTlDMOSY/DPcxPU+wWV2i7bCow06THsa6JeXZXERJbDdL7w6bc1y1HawLySwOdNi4ki5vYRI6zqVKU4/wDn9wpIrj8U17A4f6upMQyAxxMiQwMEbszpMcLpKlimsdJlzgND9283EaxbTn0Vq7JO65JABiJvGsxayTxYJNgN2lgOUcVKNSYUkzoKT8G8Bzm1pgTD6ZEgQYJAtb91FzOQ72cdIhRPXuU1NDdLBWvp7lRlDjI4BeOxB0FpVC8ynuQljjmNAtu5Jcuj+SF3u8nkoXDX1WSZrG6LhaRf6smX0jDptbl81nUybH6PJOucSOPLrPvco7INgKjs3ly+W9BdTH0YlXzRIQibX/ZEVshYRpJ6D9VO8I3fX7K9KqRuV+9EEaaR5IX7AYxhdrVmCKdWowX+69wF7aApxnarFgA/aX8Lw7d+YiVjspSdYVxiiJy2F7BFKILfQ3P6ZY4CO+jnkYSDEa5fqVSv2sxr2FhqnKQQTDQSDoJAn05rCbVkW3/oeKjah3eckJdEew3mS7jrSXguqFzrzcuuTckmdZ3qlZ2UgtkDUEHhbjIUo0HGR4jugXPsD6rx2zqkSGOgRczF+ZHNFIFt9BnZe2a1AjuqhbcEtH3Tyc3f8dV2Wye3zSctenlNhnZca3LmkyPKd9ty+dZDMZTMndw6dVZ2YC4PHhv9uiLjZlNrg+4YPH06omk9rhxaZIv67imwTcHqfPd8F8T2Dtf7PWbUE2mRP3gREH4+S+hbP7eYV5IqB1Lr4mm8Nu24MGdIEG/GMoNHRDKnydTmPtCo9wtH1Cy29o8K4wK7JM8hpOpFresQju2jRkDvad4gZ23mYtO/9EqQ7kh17v1VM38z0Wc7beGBg16U6RnbrJFhPEH0Se0O1mFptAFUuzTHdjMbHjpxVFsTlJB8ft+i1jixwqvaYyMPimcugE68jx0kjlqu15qMfUpVjlBzPe0d5lME5WhgkA6buIF1zrqtOTDxlDiAMsOyiwJkQDGWwmMsLYb2tcabmOd4rFtRjbh05nZmyGyZjMBNt8lbXfJI2Nq4PCVA37NGUvAfTpy0TlJaHN/CCYaTG4DdCVq9msOGZamINJwdGZ7czSWktuS7wWA8LjIvqCFyVXFGxa+ahMm2gaIH9ozN4Ees32djm0wWmnmL2uacxJbNiHBlojjM8CNzWmtwtG/h9m4Oq4MZiXZzAGZj2Ank4E66iQPJe9o9ktwojO15vIa+S234g4SNRpx1suVqEwSOU9J19lWviHvDQ+o4gTAcSbnUjNvO/opp7UJSPC8Hg0D+sT5KrqonLljTr53v5oxpMFgI3dRxvrJ+C8dQbch0EaC151/TTilTTZk0DcQAS4e0SR7oFV2bf5afAwE1UMatB9xffB0SlRwuBA5QE0RhN+IM6n2XqvUwz5s0EcwAVFf0h2DQeKsGzefr1VA825/opmn5/WqwgRzRoQVG1gNBEfV16bcfioS5CwWe1MRME84VvtRE68FQA8+vBVAN58kKRrC98XcbeyhI5+XzQntJiPl0UDuM+SwD2xOp/bqrgCwBmNf3VGi5HDT91V7Trv5b5RMNYUGYJ10AkzPkrF4aZgEdNecykWEyJJkcNfVOYauM7STABkyJsLxHPRBxN1C5W5Q8ttMAcbSmDXptBDmSSZa4RpFm6HncXRcM/v6hp6aloPS1pgWVKtYCoM8Pyk8b2A48p9eKHA55hsQ0OzNLgIdmHik5jYBzY0ESZF5QcbjCQA0uygABskiQbG5M2S1eqXOnnYWiDuVRrm05bvNawanx0HMNtF1MGBmBB8JkgzrbUIeJxxIkhsQLBrRpMaDgU3hti94A5joBEw4wbGDbXVMfwhrAS54vAEtJueQ+aTXFdRqk1XQxi8vcAGgmwGgMmwEnT1VSC0lpbBEzofFpqNVpMw1PvBTFybZjMbzp5C6BiiO8LSfDI3HTeeKZTT2F0iLqh04/RXrd5iRu9j8kZ9QDwwAOMwfoLUrYmm1jYYZHhkmwOsNuRHVG/YKS7mMG3uIA0sbnh7Iz3GQDPMGxvuEaD2RX4qbgcLmLGfwxpuS9aSc1oG8pG7ZkMtq02g+HWCLz1E7x896VNUNJIAPW8+/RSRYmOpuvJ3RmHuOh4+yyKXYy9gcwEWJIIsTcjxQGgmDY6fyIcoblg5h/vHC148I8/qyA+uW2ALYkXNzIGoaYMtj3UzATaJ13aXS8DykkwVQb7zf9/rmi1A2AXC9jGvXNaYv9aldzjFvTl+iGXAxm06kR/JbTZFjVXGcHZQNNNJ5CEvmeRrbcf2G5VygHwidb7gpUe6AZJsOBtJF937oqKXAKJVaYjM4247uH1CozKNRI87X4zrYr04d0SP5aayo/DkXgxbWwvO/eLFUVDxYKtUJJM+5+aiDXojMZkHkCfcWUT6UEedhXGCCLeS8yGB6JsvEaeZm6UL45KcZN8nOixPmhBxt6wPZQ3Ptr6r18gxu5fyTpBs8BJOn0VYu1v6ahAniV6HevxRo1BC8GLm31dWaY33KX72CI3aKrqnib9ao0GhoHmRr7r0V4KocO9pgtIkSJEWkib7rFFAa0cTx+SGnuahxmHZkzVLHlrEEj4HggPLLFreZnr8oUr4lzmtbGk+bjvJ9AgGk64ynNy/l5oMNF31iDItEabkLvCZO5EFF+9pA00PyV+6iQBboltID2A3M+x58lZkmPdaODoNc2/wCG/lzI+rJTEyXkiIndpGlpQ1W6GoawDBdxcYYPFI14TGm7jpuTGLqRdv3XBro10t+unJZwdDHBp+9Y+REBeCrEDSPo9N+nFTcLdm6DlFseMuANzpMF2htv1R6OBjxPuOJcJNjpA4nik8RtRxYG6z6kWhBoFxMjcb6/XFCpVb2DwWq0ZmY3WvNuEGL+aEyhm3x7kR9cUbMCf3Ko/gDb5oqbWwKKkQYn66L17hpJExw+cjerUWAG9jBnfHGOFkOozxQ2b8Rpx0C17hPHMbxPHS0courUwwGcxOvIdL896GKXivGsGCZ3fJWrmATGkxzgb03O1mKtqAF3h0IAJmTlaAHTMXjgi03h0AWdw16wdeG5JYWqchkic3LlvTbKzrcLi0dNfVGS3De+540kibkcdw5HnZCr1ACA7neeXDhyTDbGI1BEEzIkTMHl9WQ5Y05i3SOBOlx+/FGtzMWouk8Ryv8AdvYHr7pjH0Sx5pzZrskxvtm+J8oRGYykXSGCWg2I8JuMoGU6E38vNH7ynVk1B3ZBLpaJubkmZPsqaQCTGDMfGYEaXN4mBHFNMxcEZRBiJ0mJuQdEzTqUyQynVPigEtjpcgCE0/Z7GNv4j/W8U+RJSyiNG2jMq46TJa2f7QG5RZeMqgPcACBOkAxynevVlBhp9xl4JJOgiyE8wFFFokLBd7wU7/3UUVKGoHWfoUVukQoos+DMYobMLjcwnMRs1tNkmSbRMH9P1UUUFNylTMt1Yxh2DEVJe7K0dSTAHI+/oi1Nl0s7v9Y2WkgAtd4nC8ARA1AuYUUVo+qTTFUvvX2/kHhwx5kAkCIda9tYIkb/AEWjTwxcRlHr+69UUprc6YLdIHtCiPDmJABmBeUWk2nlHhBEaEX84sVFFDJJximhpVGVIR2rLaWUWBMBosBMlYzKZgX4n69CvFFXG/RZGYV4FgLn4dJVKbM1937WUUTLhijfdiZi9v3XpeIiI9/MqKKC35AL1HzNxZEw7S426zykX3KKJpbIYKYaLSI1iBxIn63oVR9jFj81FFooz4I+nOo0Jk2O6TA8vdK4hoDHXknS26N6iipDoaIvghIA4k+qYa0g3tfkoonnyFjLMOXluUix0IFpF7gXPVOHB07yCNZMmRESAG2/dRRZAZSlgqbjlpNh2pcZj0JKLS7P1i4nMz1N5H9lRRFtopGKaNHBdnwIc543EQLcloDAgyC4mNw+dvoqKJbbHUUjhNt4eK9UAWDiBfgvVFFVcGaP/9k=', shortDesc: 'Сердце национального парка — кристальное озеро среди гранитных скал.', description: 'Озеро Бурабай (Боровое) — бессточное озеро в Бурабайском районе Акмолинской области Казахстана.' },
  { id: 'okzhetpes', name: 'Скала Окжетпес', subtitle: 'Высота около 200 м', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExMWFhUXGBgYFxgYGBcaGBoXGRgXFxcYGBgYHyghGBolGxgWITEiJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy8mICUrLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKUBMQMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAADBAIFAAEGBwj/xABCEAABAgQEAgcGBAMHBAMAAAABAhEAAyExBBJBUQVhEyJxgZGh8AYyscHR4QcUQlIjYvEWQ1NygpLSFTNjojSD0//EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EAC8RAAICAQMEAAMGBwAAAAAAAAABAhESAyExBBNBUSJhcQUUMoHh8SNSkbHB0fD/2gAMAwEAAhEDEQA/AFCqJphcmJJXHsHljSVwZFYRSuHcMYllIbQgwzKlmAJXDUlUZs1QwEtC82dDYFKxV4zlEoph0ToYQoHWKXpCIIjExTiJSOglNBVLa0UsrGQ3LxDxDRSZbyJ8PypsUciZWHkz4TRSY/njSVC8LdNGFbwhhFzo2mZCajGunaAB8Vh/CkAiKVGLhlGJEJoLOrRNDQricZls0VsiYVC7CH5GCCg5flGWEY7sq2+Co4hxBakqDhIq7xya5WMnJUuWgqRbNQA6UcuY9ARwCUFZyCo/zEkDWgNoshKDZWpHTDq4aX4I39TDU6eWpy6+h5PhOFYwFIydV62oI7Th3CFZRnNaP2/SOjEoDSMUDpC1utlqeEh6PSrS8t/UQVhUI0rApuLaiUExZokamsSWQNo5u573OjEp1Fa/dS27xPD4FQvXtiyz7RArJh5vwKhVfVa0TE0aiNnD5i5iapA7YG0AovE1pGkrJ0h0BI0ERm4hI0gy+QUBQTBcrVMLqxQiaJjwwChYEQmTBpGdC8FGFS1YVpACjIPlG8ZBYHhgS+kbXIIuI6qVw9FwIYkcN6QhLPHd3EcfaZxqUGHMMkx12I9kVILsG5GFpnBSg2aJ7ifA1pNFMJZh2VJIiylYGz2ixVwl0ulwqwT84hyNFAr8DhSohO8Xa/ZRLO9YZ4LwtQqoNzfxi8IADCMJ6lPY2UdtziMZ7OoAN3ihxfBstX8Y7/iyJn92w3Ov2jjuKypoJKnMaQk2Zzijn5kspiUue0axCztChMbcmN0XUjEw7LnPrHOS5hEOyJ5iXEpSL+XMiZmxWS59H9eUcgv25mBZBlIUh/0khTPq5IB5GM5NJ0zWNtbHoHSwKYqKThPHpeIKhLd0gGrVSbGhobONHF4s0zIFvuhNkwoxbYLCqUkkWEKYYA35R2KeGBgGa1omUkioqxXhfDCwUVULunlpFvKCUgAG0ARh8oYRErAjGXxGi2HEqeNgRXKxogK+JDeFgwyLl4gqYBFMeJvasBXiFqhrT9hkWk7GDQwmcYkF4EJVKmBqw6eZi0khWOy8cIIMWmKphYAiGESEs5LQUgGkYqtoOqY4hBCO2CrzEMBBSA3MVsYAZJNzSIflFO+ZoOhJ3h0ICZUM4eSYmJY7YYll6CE2OiUsCIqSTDKWEbCoyyKoT6E7RkOvGQZsKRwkvAEFh3xY4TAzMwyU52jo5OHSmwDxipWwaNXq2RgV4nLcIL5mu1IFiOFKVV2MXCEbwNeISlQSVVOkTm/A2vYthOGpS2u5h1MtKbACBLxyB+oRsYoG0S8nyNNeBh4WxKoIJlKwKYsGFFbjbFVkERWYyVvaLgBD1gWMkoVGqe5DRyWNwSVWAftinxHCyD7h7o7zD8Nl3IeHgpIDMOVIvuVwRgmeWnhav2mIKlJQpKFqCVLfKDqwc9ljHb+0/GpWGkqmGXnIdgGFqknYDU8xHmXtRijPmgqww6QIEwArYJQkqcKTnykvt+08omfU1sOOgmWWPnywUIfpCVpBSkgsVFkKUMwzJzVYO7cmPBYvEFaspJcKLEqc833iwGKImDK4IH8Qg1KkZshLkuwIpZ+6K3GTpajmQFuCAo5xqLmj31eMFJylkzZJRjSHeHYpUnLNSlLoLE2zA0KSH1BNQOekel4YBSETA7LSlQfZQCh8Y8mkLFraWfzdj8I6z2R9qhh1/l58tKpZcpU+UhQtmW5SUskCgowvGsJ0RJXuehcNlkKBKacxHSniIMInEhQS6FIcBxRxuHFDCy5SXcE98U9xLYt14kkUrCU0zFaQshSgaAwLinFkYdGecrKKsP1KOyE3UfRaCgsbThFMSo9whcyxHLyPxDHWfDkqclACx7v85Ysb2+TmkxXt7jAvM8sAP1MoKA9sxNSdqxSjIhziej4jo5SM61hIAJ7gHLC5LCwjzvFfiPNdpcpALmhdRKS4TZgDrq9O/jsdxKYslcxZUo6ElRY8yadnM2iPC8cEqAKSWc0Fc2/NhYbl4tQrkh6lukWA4zMROUtUxaZxPWWlwpyxqoe8BTq2oKNSPTvYv2ulYoCXNUlE4MLgBZt1P5v5fB9PMJ0oYkulJSXua9oNvXewp/CJqQVpOcpJcJfMwDuN+yvyCli9h/Et0fQM7DpSdYlLkpNxHhPCvbTGSwycQtnJ6zLDkuXzuTXbc7x2nAvxRZ04pAUaZVS2SWarpUpnsaHWMnGSRS1E+T0XoRoI2E8jFTwn2xwc85UzMqtErDE6MDUEvoC8VvtT7cCSoyZCCqaw6ywQgEgEAiiiajYVvEW/RomnwdPl/lMFEyjBMeP4n29x+GxCukUJss2SoJA2DFIcV0+rx2fs3+IeEnsFnoJh0WXTozLoKvq1jBewsknTOsSTtBmO0TStw4DwSIci0gCUKgoTA581oHLnOWh02Aw0ZGs8ZEj2MzCIfmExTy55e0GX2eEa9snItne0QmJcMUgiK6TjFpZ0lvOHelF3vvEOLQ7skcMkhmpGIwwSGSIlLmho0nEJg+IKQFcoveAzkqFiD3Q7Mmpa8KfmRoIuNsl0JrXevhC35tH7/F4exOPAHVDk/wAvzirVUf8Ax76sT9I6IQvlGM5tcMfwuIsEkl3q1KXhvpA1bxzSsWZQKiRLSL5qADm8J4ziSyWlJzgprMRMQMpLMwOuUu9rHUROtGMN2w0tSU3SRU+3uLlzphldcdEC+UumZmFiAQFAEgEHc3jz7GS8mWYtRyroSespNTdW5JFNGHJ7LiWJmCdnmS1Zc4DKMpRKAp1F0AgrzFWuw0g2OwSOjUUjNmbM+QJRqh1gBj7pLOTTeODe7Z2pbUcuuUAopQwvUuQ5H3t5mMxGGUAlZIIDBQCS9gM/K0OYrMSUJVT9Ls4vlDPd6sN3giVgoLkpJBFACx2v7pcxokQVS8SZSQrKlSbXIIJDWvoDfWIJxAmpFGUKipvrc2pZ4HiJKCslKndqFnAF20f6wkULcVZQNrPS8VZDPSvYX2pWFJkzgSlSUhDkpZRKlXLuGzeCRSPUDLloBmKUMiXzKzDKMru50ZjHztIV1v8AuMAAQBdz1mFDV7d0WU72imTwhE1XVR7qBRILl1ByesXLmKyrkmW3B6Fxf8RE5yjCSwUtSZMCveOoRSgt1texjxOLnqmLzzZilrN1E97bAVsKDaBSp0vK4NedG+sJzcezhNSddKfGNoyTVxOabd/EPZwmrjny5CK/FY4EuAO0/EDSK+dOJ1r6sNIihHMxaIQcFNyewC779kEw+LURlHVozgbOak2FTC5KQdedvRgkyYjKA1dT4vBkWizwcwJZpgJIL3AykEljy52uIvMGCD73VIKmLtmoosHcjKCe0HeONMxLDK71dyOVm7YZk8QUE5U1YEOWJA2B0rUd0RKjWMi9xPCkHOpiKliDS92euvhFRPwc1CQSCxLDVyaClw5tDeFxc9bS0kGmjUD5anW9rl4lx5CkZP4iyMtyzjQ2UdSaxm9Si3BSV0PYSWjDIKVjNNIcgZSlKaEp61HLX7G2hVfG2UlRBWElNyXOUggZiXNgH5AdtKriMzVTihB2a3h8zA52NzJII2LvtqNBrEXe7HaSpFvxXjKJpP8ADIoVOFXWwTXcMED/AEwhPmpJdIyix5sBXtrCKZvLT5iJJSC/vPuRyEGVEt3ydX7L+22JwZAQrNL1lqcovRtUmunnHpfCPxQw84FM0dArQqLoJc0zgdWjVUAKx4dLTXq9/oxNL/tIHf8APsibQla4PpOTxEHr5goaMXB7CKQKdxUPVTDYR4Fwvi06R/2VqQ5chgUntQXBMdXw326UWGIkpIP6kOkj/SXB8RFKUfI82elf9WH7oyOQ/tZgf3K/2GMjS4+wzOxXh1CqfjE5fSE1YRZfl07nvKh84kRRmJ7FfWHkVQtJQ9/nE5kvZBPOsbViNGWObj6tEBid+k9dkKmFo10auXeTG0ylPRvAxKVi0PZT70hr8wnYwm2vA1TNSWF2eMUATaIKxOUE0AFySwHaTCkziCHP8VDi4zinc9LjxiUmO0Oml/nGKmEAlwABU6Nu5jjeKe38mUcsk/mJhoAhgh+cw0bml45P2i4zisTkEyYlCT1ill5UsCaJQ72usO9iNDU/h1l5FF5fhOi9t+LS5mHUmWoTkhRKlBTS0qCWAM2iSQVJUwJ93mHo+EqCJDLUA6iS7HpElKSnKXrRKaildRAiJOWWlTTiEqKRJwilTHW4zGarMGKio+6nTm48emapK5pQuUw6NPSFImKoxZMpglIvUiu1Y5ZvN2dEFiii4zxPMsJFNaZTluNBcg15Qtw7GTFCbJVn/wC4FkhPWSCnIeqRc9VhyVSBzcMkoUpIA/iJRKfMczllFRUrSvugWi4wnD5UtZX0qukZJLe8SxcgA1FReNNktifJS49AzVSqpB69FEGhWe5NyBpCszDEFUwMRQcywBJa1jfs7rPG8QmT5plDNlRLylqqBqp1oWyVAkhgTQB9YYxPszOQUqCgEXCQrMsHJkLtRzV63UeyJnqKK3YmjjMXKyADRdie6howq/hB0IdBK2cOkEbM/wAWHjHWYSQQg5JqQ5IIUwY0IYKTUsDUHSKqbg+oUiYABQO7GzgADq2cikQ9aMtkyaOXZZKUkM5HgDX5w1LypZ/RO/ZDMxDqfvPe5Yd5buELGXlSXGYuCAQPB96nyh52TQWWFAAlQr5AGvfBwxDHyZx2wj0n7kmhA7yWPI/aMKwCz/y1vS8O3doTSYyZBDsHPrziCnHbrA5C1AknSo+FtKQUY4KozsDfz9co1WvLyZPS9AwfP7RiUk6EnYB/h3Q2FoDHID4n+sOy1I0Uw2sTSB9SvQlplVLwiiToBFqrEDKEISAAkBgxcsElVbEs55mNld7FudOUDK6ZAWo/KjA18IylrORpGNcB8LjxLRRJzO7Bw4AIBd6Cr2HbYQnjccuZ71LtWtwbWqfhEigNepqeyjD1vESgOA1TSFnRTb4EQg2Z6b1oeQ3jZkvbQse1tjSHCUjXy+vx7YEp/wBJF9th8aws2TRFGGIuQ++gs0bEkH9RLbAB+3laJpUVMUsz3O1HbmKiNJBYFw1Q3abn1rBmx0F1owtyu/1jOka5DjvHcYAsg9U0SC9NxXwf4wIqcNZrPvsNe2CgoaOKvelDcXFL3iAxd3J1ag087wt0rln0Hh9njRmdUFVRTtv8HBh0FFjnPLxMZC/TfyH/AG/aMiqCkfSQXNFSlQHMmCHEki3kPjHjqMcE+7NWOaVEgXZut2QaR7VTE/38wnfpVO/eWj0308vByrq4+T2GSSdB3lMDn4uXKBVOWhAdg5SkPe5pHj2I9rsSaInzFE6Zlhu8KrFZisTiMQoGdMUpk0K1EsNgOfy7Il6KjvOSQ/vWW0Itnp/GvxAw0g5UfxVfyEZezPUE9gMczifxQnV6OVLQ++ZRHmA/dHHYbhqldYqZOhu9dA8GlcPlZSVKJINRbRwN7fGB63R6ezdv+v6Gd9VqcKhji/tRPxKcs+copH6QAATzCQAT220itThcwLCo0LDcmp5dkPcOwspU5KcpIbMQGKrgjK5YBhqahVHLRdYzgxVSaehIU6ejJGZ6HPnZRLAcqHk2er9pwgq01X5f4RpDopSd6jN8F4UrD/xllJmAlJQFglIFf20UNhmd35FfiHSBaBNBGapQ2Zllw6gAAKUc8mEWWCxyJRQhUxSjWWCzl0sR75CSTckA27oS4pIz5SVKVLJTVJSkEEdYlRsr3HygAaWjy9TqHqPOR6EIRhFKJrhGJXICyFpEsKonrZkkU6yXykhKRa7glhSLCfMScoKSos+ZpbJBKlIe+RNmHfcxWLVICWSCquaW+QB653tmFGY5tGoKC4hxQzEgKz5hmQ4KiVOWCgl2djT/ADUZzGffj4KyRoTl9Mt2CFAp6qy6EhIZQJSAT1jYUhNZykOc8xRSFEkhNFFAAaxoSdy92icxZcu7UsetuqvdfnyEZ0d8rsATLSSP0kJSSTR6mMHr+FsSamsEkSwnrAAFmLscz6/todR4L4ucsulRbMWDmn6lE5Rej8qGGJEsIYIagoRV1G5fsEZMkCW7OVFIBO566lNt+n/cIju27HQhj0ECg1fkxbVqm0Vc2axDZSXCeqli6XBfVrmth2x0C2brMcoSoE0SxqO1gE6QsvCA5CoBmTStNKNrlUKd0XHUrkTRz6aJXYl7PY1ap1YkX1gWNRmPRpDa5qt4jsZouBhg7AMGUAGBvlCSX1JJ9WRnYYpBNMuocEuApIvuQ/8AqHNuiOomyKEloNC4Llm5hlP8IEiW68xre2pc33vDnQhIGpoCQ7Ps5PKF5MqY5BDHnZiWLNQ0jVSECTNDl725NSvyg0nKLAV5NQl60qaQLESUOCQzncB96O4HdBJkxhmAJIIfYuNNmcUh88BROXiXFrZn7uYgqlAEpfs3rZor/wA3mFEVJoeyp+fhBJs175jl2uxoBQ7vCcQoelzFAGpIcejvBVzHDNzpCEucVF2AFSC7U+Z+sRXiiHYjQXsfTViaZND4mga8v6DwgChR37O8eMaMwWIfsu/g8EyDTYgORfeGn7GRzNSpBo/P61iC1MBWgDAavv5QZMpTBbUfcPYl28fKALU7F2ZQbq61YU7fhFIKIiZUJqOQBDcztr4xgl5Uul1HXxOZvHyiawczO1qBtXaNCeAqgFHF7EO94LFRMLDXZLtpofvEZ089jKHhQ031jaFAlIplJzNdy5a/P5xJSg4BPWf6kdwZ4V7jBykhQuKjVmqR4UEbzOCWpUcikWbuibCuWhIvpch+Zp2Ro5QkJ7BQcmh5AS6Uf4g8TGQT8sn/AAoyDJBSLMSZZrmmD/TfvjaUJBzBzyOnqsFl4WctSgnowEUfMACT1mBuohzVmiwxUiXOwyEhRStCaWyk3IJb9RDM9HjCX2jrvZy2MexpreirSog9VIFGFKjTzrBgCGBWxIL89Sw2Zh3RZTOBy5dFzl5iDUAAAOCWBd6ADsJLRmO4bLUoIluCFJKlFVkAEKIzVdiabxyS6pye7v5/uapJbIVC2ABUAC298tvAxHILBVCcwP7gA7G+6amvVg/F+B5DL6JZKmqhWWoUpgSqjFjWlWpGTcF0cuWpROeuYAuAC50vUCsJa+3wvktGCakqJoJgIIygMAANha+0PyOJIc5zlexAB3JJzXFtI5zFY4y3GXKXdIHWK3DDWmzHt7R/lldGcyj0oJytlYJdq70BN6DaHUnu2G50k2chcxwSoBKus5CgamultPCxhLF473yVv1gCA5a1G3bLFUhKZFCslWpBAHuuwFS1/LeJTMcgJABtYvrckEWr8ItPbixoNh5zkOQoJQzCrEswIBpQG/bBMDNClJB3/T2hgDpUDwaJS5CCkLABqTYe8oCp1fTuhOWqWhZyiooL8qnenbaFlFtqmVwNIxK1EpDAhRBchmoS5F3ceHbBpqykEPXM1OZTU0uWilXxhTFJKgXCaiidKg9pYEtFoMSjLmIUhTm5dGYZiAaZg5ZuW9w3pPbZAmNIliX+pzmeumehCeQNT2vEZ810kIBfMBepFhruzkaeMVuJxKpgKkpUzlL0LFnckUaobu3is4liiggpmAmjirhQA01bxpEx05Nq+ROR0yZpLIUlsyakijsGcHQNbkYUxuJKRlSkkhQJJbrVu9qZn74opeLXMUEuQVXNaN6PjEsbOIJSFEswcaD+oaLjptOqDIt1pNEJOgY2ows97t4QtNlFNA7FJ5lyojXt8DFHMmqQC5JLOkkEGwIPfB8Ji5ilONRXaopGnbklZNjuNJANOqGIABcqrQt3bwtKkEnNUMag9pNTfYtyi89n8WlJmCclEwskjrDpBmp1ElQC8oBJavWFWpDuNnYBaS4XJOrrlSlEmj9YHbs3jSMHjsPF1Zxi5KjnClDYMag1ahG8FwqAkZQXOpqATcNEMXMWgkBQUlnBzAgjYFBIzCxAOnOJ4XHBcnozR1EFtK3ANrisOWVEN0QEoh/d5Vo5NbdsR6IpJLX95t3JduQPlCXShM9NXSFByQA4e9OUWXDpyhMKjRgTZyb7aUNvOLdoLBklyVMSLVsK9wDQqmVmYCWxzObhOVJL+ZaGMTiUkEsQolRcEaqJAUGr9gKQWdNQJaSFKcEkk2LENTa8FtBdg0qelSWdkvQXctajRuRLWrVN2AUfe3NrQtw5BVMyqGUqcEnRJqRTU274zHTjKnFD0B7KF/CKcHwgadbFrJlKU1sre8zjVrWpvuIIJCkhVAAm2xe+Xs7rxWycW6CTMSAA5oXJdW2/jEzxRpZ6gqCBQHkT5nwjHGd7E2x1zVwDpm5s7/LvheYVuoZVOGKmQaUAD87RWJxRSpnNHJuWpTv9dlyONkpSkGrKJI5lNKn+U+MXhJbjtgEzCQMvWvZz1nJAgokTSUp6qbZi70apa22sIzOMqUZagwKWBpT7t5PEjxEhag9WUB/tLP3w3GXhA2/AzPw60VulnoKgAt4VgYxHVKkhTJupqO9K6RGVxJVwxDhRcUYVNNmH0gJxrSlBqlRAApXdh6rEYyfKEnZL/q3NUbjXT/y/+pjIvBfyiv5HT4fA4pLlQyvmuxYkXZJLAk3EMSeHqKigzEpLZlJKS7DV6DcV8Ytk+ypKiTNNS5ygjQJ0LMwtaNy/YyRZSlG9zSt4y+5zfP8Ab9WFxKPieHWtQKsRLSQxYhadnOVq9xjc3BlLEYwBS6OUimuiqdpjppHstIRRBUlwxYgODpGley0h8wvu9fHWD7lPhVX5f6FcTm+KL/iIK5yXYZilwD1Q5CWH6qV3FhEsfxVE5Kk5jm/hhDByMxZ2TU70jpZ3sxIWxUMx5n7xr+y+HFkpFrUhR+z2kt+P+9BZwfGcGUzkJBzAAOHBV1SzmwzEgWe9zeLfHcIXLQqYqaEt1uqUqzPVnKwzBQLvRrF6X872SkKLlIJ3LmNq9nJLMUuBYdZtrPSw8I6F08kkn4NFqryjzydLJAWVIIbNmSokPlSCOs1frSkM48YdOXopgWcpKiVguf0p6hIBd9BzJ07OZ7NSB/dp8/rAJ3BZWqAe6B6D2E9RFFgMqJRVMxMopdSEpyTMwUbKdQAAYDx5RVrnJTMJM1KUGudjn902T1srlqisdcOFywGCQOykLL4SjQRHaptj7i9HIYzozk6KYJiplSmiRKzfpMxStCQ7sKGsOcXxcsS+gStNFqcl1akjU7ltLxcr4X6rEV4Bx/WBwba+QskJcO4qlEsISlLAKcZ0uX/UFK3ew27oqV4hKVKUmYzkWuwKTcdnw2i8OBMBVwx7wR02pWkPuFUeIBJd8xylibuSXDlWwTU/CBKxQKVDMEuQ7EVAzaVbSOgk8JTt5w7K4LL1bxBjXtNu6B6ispuE+z6Z8lM+biJSJSCEEdXOQC5JqMpci93i1PBcJKCpYmTAupz5iTSjEhAlpDElnckirXufyKDLTK6RaEAk5UKCEkm5IA6xO5fSLHDKKGyzZgZOUMpmDg0ZN6CNO03yV3IMXw3BcOkLShCFBTJUqYqZMmFAcgEJljoi7E1AdLRT8T4Fw8KGWWKnLRdM2wC+soktTnrHQ48TZ150xtilKx4LSQPCK2V7MgKzBVblpGHHwlQ46UkD1Y+EUUngqFzSFSjLlSwBQrDO9S7h+Ww0eiyvZaUQOgxkoLFSJiw2UgMXQkt3jXmH74YMkMpc1VGqogtXVIDXNYGrhKCGZVgKTJiSQLOUqBUeZrXmYfZYs4Pweaj2RmK92fh+q7kTFtQl2zIA2oDFpL9hMTrNQDv1z8hHcp4ckJKetlNwZs4g+K4MvDvcq/3L+Zi46XszlJeDgkfh3O1noH+hR+cNyPw9IDHEA/8A1n/nHVnhqd1eJvzaJIwCRqrxVFduPoVs5kewKf8AFDu4IQpwaf8AkbTaMR+HcoVzqN9DqGP6juY6tOGA1V3kxJUr1X6w8I+h5M5Qfh5Js6/E/WJH8P5Ns0xrM6bX1G7+MdKqUf3N3feAqlK/efAQYR9CtlEn2DkV94vdyj/jB0exkgVCa7tK/wCEWokr/eYImQv98GEfQWynHsjh7ZB4S/hkjZ9j5BL5R4S//wA4v5cpX7j5fSGUJO58vpDwj6C2cz/Y+SzBNOQl8/8Ax8z4xFfsZJP6dX/Rdmtk2jrUpMTy8hBjH0Pc5b+yyef/AKf8YyOqYbJ8IyHUfQbgOmG0a/MD1/WFj2/DsiJbUxNEDfTjaM6cbDyhdCg7V7oYStJ5b29CCgJCYnZMFSU7Dy8ohlB28jEkyeVfXdCoZslMDmZbW8YKZe4aBrSLgfD47QDE56KUMIzkGLKcNX+kJT/Xr+sJokrphhdcyGp/r1pCc4xDQ6BrmQNSo0pQgZWIhjokTyjM42gRVSBlR5Nux+AgsKHpak9kMy5ydorUTA1eXLwhuWqxZtg+3LW+8UmKi1kzU05/DnD0pINK0Z/OKqSLCje8XPkH05voNYsZAd9jVN3jRMBtKTufL6QTId37/tEZYFT69fWCZaRVjIlJ3iCu3ziS0/KIqT8vTw7AgS2sR6SMUkXf+vjXugZTz7Nm74diCBcSSqFgGN6dzQQDUem8oLGMAxt4BTvgo5QWBtRiBAjZ9d/xiJvTXxgsCJQNokAKRqnoRmaGAdA7fQgyBAJcGSYQwyRBAIGnw9ed4mVQDN+tYyNdId4yACnSj+VPY4ftv2RgTWgZvVrxNw7W5GpHIN9IkRvTlRjTvI8IVmZJOzB6/G7RNFntXu8qxA0PPd2Jt3xJCrMWPc/9IVjJpUTb40+P18oInsZt2PmC0LpmF2V518gPnBSuoI8PQMAwgNLP5fE1iE1R977RsTOV9Pl4xCZNDCrXNWb+kIAE4lwd/XqkJzlVIZhrpX12Q7MUD9NH0odPKK6aqpd7kOH50raAQss6afHsH0hSZ9vRhydr68fvCkyIbAVWNu+BZIZUIGoRk2MCUfXSNJR3Qw3jvGgl229eMKxgkosT9qQ2jD2N71NAw7b/AHiKXYfqG2niYallmbtbvsN/KGpCDSU1DO4F/I8yPjDspNwKqfWtKPT67wvIAYaUy8r27XrSG5JAqKOeso6OHATFqQDiKMAWt2/05coKz6wugsHqSYIg6eu+KsDajGifn6pGOPl69axHM/2aHYGl+vnAlIHi3e28TCv6feIqV6LDzh2BFSBpTs3jaEARtqfb1zjYaCwJN5axIj13fG0QB7POCA+vtBYGm9evXKB9Fevd9rQXPGnh2AEStCO7QxvKL79npoI+kbQRBYGJHfB0hrfHwgSVNeChX3h2MMTy+/dExv69dsBCm9UtflBCrl8fjBYBOj7IyA9L/mjIdjK1KSNeQvSrbt5RiZlVVLDTqsaf5aRkZEkGJXR/hQ6axiqFqVrbvjIyADRVQdrXp56cqwxYdmgJbwjcZCGAlr6oUzOwYU2+vKMxZypprT4fXyjcZAACYoZHa4520FYXnoyneu5F++1bBoyMiRCaqt67qwCYqsZGRnIAClQNa2jIyIZSJBbxpEwk+XpoyMiQCJmfxOjHia+UNyUdfL3vppRoyMikAYzKqUQ5SGHKmlKWhqUokpcuTXstpvGRkWhDGHXnqd2gwU42AY01eMjIsYMzWALXLef3iaRm8W30jIyGIioOH8oifh9tYyMhgRmKY9hbyiSaAHftjIyADaV17niaT69dkZGQwMCqtG4yMgGQJjHrG4yARNc2uU1trv8A1guHU48oyMgGTSsxN6PG4yGBpxt5D6RuMjIYH//Z', shortDesc: 'Величественная скала, чье название означает "Стрела не долетит".', description: 'Гранитная скала на берегу одноименного озера, овеянная десятками народных легенд.' }
];

const DEFAULT_TREES = [
  { id: 1, name: 'ZHTK', species: 'Сосна обыкновенная', place: 'Сектор А-1' },
  { id: 2, name: 'Алина М.', species: 'Ель сибирская', place: 'Возле поляны Абылай Хана' },
  { id: 3, name: 'EcoCompany', species: 'Берёза повислая', place: 'Южный склон' }
];

let SIGHTS = getStorageItem('eco_sights', DEFAULT_SIGHTS);
let TREES_DATA = getStorageItem('eco_trees', DEFAULT_TREES);
let CURRENT_USER = getStorageItem('eco_current_user', null);
let REPORT_COUNT = parseInt(localStorage.getItem('eco_reports_count')) || 2;

function saveAllData() {
  localStorage.setItem('eco_sights', JSON.stringify(SIGHTS));
  localStorage.setItem('eco_trees', JSON.stringify(TREES_DATA));
  localStorage.setItem('eco_reports_count', REPORT_COUNT);
}

// ===== УМНЫЕ СЧЕТЧИКИ =====
function updateLiveCounters() {
  if (document.getElementById('liveTreeCount')) document.getElementById('liveTreeCount').textContent = TREES_DATA.length;
  if (document.getElementById('liveSightCount')) document.getElementById('liveSightCount').textContent = SIGHTS.length;
  if (document.getElementById('liveReportCount')) document.getElementById('liveReportCount').textContent = REPORT_COUNT;
}

// ===== СИСТЕМА ВХОДА (ТЕПЕРЬ РАБОТАЕТ) =====
function initAuthSystem() {
  const authBtn = document.getElementById('authBtn');
  const authModal = document.getElementById('authModal');
  const adminPanelBtn = document.getElementById('adminPanelBtn');
  const adminSection = document.getElementById('adminSection');

  if (!authBtn) return;

  function refreshUI() {
    if (CURRENT_USER && CURRENT_USER.name) {
      authBtn.textContent = `Выйти (${CURRENT_USER.name})`;
      authBtn.style.background = '#dc2626'; // Красный цвет кнопки выхода
      if (CURRENT_USER.role === 'admin' && adminPanelBtn) {
        adminPanelBtn.classList.remove('hidden');
      } else {
        if (adminPanelBtn) adminPanelBtn.classList.add('hidden');
        if (adminSection) adminSection.classList.add('hidden');
      }
    } else {
      authBtn.textContent = 'Войти';
      authBtn.style.background = ''; // Возвращаем зеленый
      if (adminPanelBtn) adminPanelBtn.classList.add('hidden');
      if (adminSection) adminSection.classList.add('hidden');
    }
  }

  // Логика нажатия на кнопку Войти/Выйти
  authBtn.addEventListener('click', () => {
    if (CURRENT_USER) {
      CURRENT_USER = null;
      localStorage.removeItem('eco_current_user');
      refreshUI();
      showNotification('Вы успешно вышли из системы');
    } else {
      authModal.classList.add('open');
      document.getElementById('loginForm').reset();
    }
  });

  // Логин форма
  document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPassword').value;

    if (email === 'admin@eco.kz' && pass === 'admin123') {
      CURRENT_USER = { name: 'Администратор', email, role: 'admin' };
    } else {
      CURRENT_USER = { name: email.split('@')[0], email, role: 'user' };
    }
    
    localStorage.setItem('eco_current_user', JSON.stringify(CURRENT_USER));
    refreshUI();
    closeAuthModal();
    showNotification(`Добро пожаловать, ${CURRENT_USER.name}!`);
  });

  // Форма регистрации
  document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    
    CURRENT_USER = { name, email, role: 'user' };
    localStorage.setItem('eco_current_user', JSON.stringify(CURRENT_USER));
    refreshUI();
    closeAuthModal();
    showNotification('Успешная регистрация!');
  });

  if (adminPanelBtn) {
    adminPanelBtn.addEventListener('click', () => {
      if (adminSection) {
        adminSection.classList.toggle('hidden');
        if (!adminSection.classList.contains('hidden')) {
          adminSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  refreshUI();
}

window.closeAuthModal = function() {
  document.getElementById('authModal').classList.remove('open');
};

window.toggleAuthWindows = function(e, type) {
  e.preventDefault();
  const loginWin = document.getElementById('loginFormWindow');
  const regWin = document.getElementById('registerFormWindow');
  
  if (type === 'reg') {
    loginWin.classList.add('hidden');
    regWin.classList.remove('hidden');
  } else {
    regWin.classList.add('hidden');
    loginWin.classList.remove('hidden');
  }
};

// ===== ГЕНЕРАЦИЯ QR ГИДА =====
function renderSights() {
  const container = document.getElementById('sightCards');
  if (!container) return;

  container.innerHTML = SIGHTS.map(s => `
    <div class="card" onclick="openSightModal('${s.id}')">
      <div class="card__img">
        <img src="${s.image}" alt="${s.name}"/>
      </div>
      <div class="card__body">
        <h3 class="card__title">${s.name}</h3>
        <p class="card__desc">${s.shortDesc}</p>
        <div class="card__qr">
          <div class="card__qr-img" id="main-qr-${s.id}"></div>
          <div class="card__qr-text"><strong>Eco QR Код</strong>Сканируй на месте</div>
        </div>
      </div>
    </div>
  `).join('');

  SIGHTS.forEach(s => {
    const box = document.getElementById(`main-qr-${s.id}`);
    if (box && typeof QRCode !== 'undefined') {
      new QRCode(box, { text: `https://eco-burabay.versel.app/place/${s.id}`, width: 60, height: 60, colorDark: "#166534" });
    }
  });
}

window.openSightModal = function(id) {
  const s = SIGHTS.find(x => x.id === id);
  if (!s) return;
  const content = document.getElementById('modalContent');
  if (content) {
    content.innerHTML = `
      <div style="margin-bottom:20px; border-radius:12px; overflow:hidden; height:200px;">
         <img src="${s.image}" style="width:100%; height:100%; object-fit:cover;" />
      </div>
      <h2 style="margin-bottom:8px;">${s.name}</h2>
      <p style="color:#166534; font-weight:600; margin-bottom:1rem;">${s.subtitle}</p>
      <p style="line-height:1.6; color:#475569;">${s.description}</p>
    `;
    document.getElementById('sightModal').classList.add('open');
  }
};

window.closeModal = function() {
  document.getElementById('sightModal').classList.remove('open');
};

// ===== АДМИНКА =====
function initAdminLogic() {
  const tbody = document.getElementById('adminSightsTableBody');
  const form = document.getElementById('adminSightForm');
  if (!tbody || !form) return;

  function updateAdminTable() {
    tbody.innerHTML = SIGHTS.map(s => `
      <tr>
        <td><strong>${s.name}</strong></td>
        <td><div id="adm-qr-${s.id}"></div></td>
        <td style="white-space: nowrap;">
          <button type="button" class="btn-action" onclick="prepareEditSight('${s.id}')">✏️</button>
          <button type="button" class="btn-action btn-action--delete" onclick="removeSight('${s.id}')">🗑️</button>
        </td>
      </tr>
    `).join('');

    SIGHTS.forEach(s => {
      const box = document.getElementById(`adm-qr-${s.id}`);
      if (box && typeof QRCode !== 'undefined') {
        new QRCode(box, { text: `https://eco-burabay.kz/place/${s.id}`, width: 35, height: 35 });
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('editId').value;
    const name = document.getElementById('asName').value.trim();
    const subtitle = document.getElementById('asSubtitle').value.trim();
    const image = document.getElementById('asImg').value.trim();
    const shortDesc = document.getElementById('asShortDesc').value.trim();
    const description = document.getElementById('asFullDesc').value.trim();

    if (editId) {
      const i = SIGHTS.findIndex(x => x.id === editId);
      if (i !== -1) SIGHTS[i] = { ...SIGHTS[i], name, subtitle, image, shortDesc, description };
      showNotification('Объект успешно обновлен');
    } else {
      SIGHTS.push({ id: 'id-' + Date.now(), name, subtitle, image, shortDesc, description });
      showNotification('Новый объект добавлен');
    }

    saveAllData();
    resetAdminForm();
    renderSights();
    updateAdminTable();
    updateLiveCounters();
  });

  window.prepareEditSight = function(id) {
    const s = SIGHTS.find(x => x.id === id);
    if (!s) return;
    document.getElementById('editId').value = s.id;
    document.getElementById('asName').value = s.name;
    document.getElementById('asSubtitle').value = s.subtitle;
    document.getElementById('asImg').value = s.image;
    document.getElementById('asShortDesc').value = s.shortDesc;
    document.getElementById('asFullDesc').value = s.description;
    document.getElementById('cancelEditBtn').style.display = 'inline-block';
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  window.removeSight = function(id) {
    if (confirm('Вы уверены, что хотите удалить объект?')) {
      SIGHTS = SIGHTS.filter(x => x.id !== id);
      saveAllData();
      renderSights();
      updateAdminTable();
      updateLiveCounters();
      showNotification('Объект удален');
    }
  };

  window.resetAdminForm = function() {
    form.reset();
    document.getElementById('editId').value = '';
    document.getElementById('cancelEditBtn').style.display = 'none';
  };

  updateAdminTable();
}

// ===== РЕЕСТР ДЕРЕВЬЕВ =====
function renderTrees() {
  const grid = document.getElementById('treeGrid');
  if (!grid) return;
  grid.innerHTML = TREES_DATA.map(t => `
    <div class="tree-card">
      <div class="tree-card__header"><strong>${t.name}</strong></div>
      <div style="font-size:2.5rem; text-align:center; margin: 0.5rem 0;">🌲</div>
      <div style="font-size:0.85rem; color:#4b5563; text-align:center;">
        <div>${t.species}</div>
        <div style="margin-top:0.25rem; font-style:italic;">📍 ${t.place}</div>
      </div>
    </div>
  `).join('');
}

window.openPlantModal = function() { document.getElementById('plantModal').classList.add('open'); };
window.closePlantModal = function() { document.getElementById('plantModal').classList.remove('open'); };

window.plantTree = function(e) {
  e.preventDefault();
  const name = document.getElementById('pName').value.trim();
  const species = document.getElementById('pSpecies').value;
  const place = document.getElementById('pPlace').value.trim();
  if (!name || !place) return;

  TREES_DATA.unshift({ id: Date.now(), name, species, place });
  saveAllData();
  renderTrees();
  updateLiveCounters();
  closePlantModal();
  document.getElementById('plantForm').reset();
  showNotification('Дерево занесено в реестр проекта! 🌱');
};

window.filterTrees = function() {
  const query = document.getElementById('treeSearch').value.toLowerCase();
  const grid = document.getElementById('treeGrid');
  if (!grid) return;
  grid.innerHTML = TREES_DATA.filter(t => t.name.toLowerCase().includes(query)).map(t => `
    <div class="tree-card">
      <div class="tree-card__header"><strong>${t.name}</strong></div>
      <div style="font-size:2.5rem; text-align:center; margin: 0.5rem 0;">🌲</div>
      <div style="font-size:0.85rem; color:#4b5563; text-align:center;">
        <div>${t.species}</div>
        <div>📍 ${t.place}</div>
      </div>
    </div>
  `).join('');
};

// ===== ОСТАЛЬНОЙ UI И АНИМАЦИИ =====
function setupFormsLogic() {
  const cleanForm = document.getElementById('cleanForm');
  const cleanSuccess = document.getElementById('cleanSuccess');
  if (cleanForm && cleanSuccess) {
    cleanForm.addEventListener('submit', (e) => {
      e.preventDefault();
      REPORT_COUNT++;
      saveAllData();
      updateLiveCounters();
      cleanForm.classList.add('hidden');
      cleanSuccess.classList.remove('hidden');
    });
  }

  const volForm = document.getElementById('volForm');
  const volSuccess = document.getElementById('volSuccess');
  if (volForm && volSuccess) {
    volForm.addEventListener('submit', (e) => {
      e.preventDefault();
      volForm.classList.add('hidden');
      volSuccess.classList.remove('hidden');
    });
  }

  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      burger.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
      });
    });
  }
}

function initRevealAnimation() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.15 });
  items.forEach(i => observer.observe(i));
}

function showNotification(msg) {
  document.querySelectorAll('.eco-notification').forEach(el => el.remove());
  const banner = document.createElement('div');
  banner.className = 'eco-notification';
  banner.style.cssText = `position: fixed; bottom: -50px; left: 50%; transform: translateX(-50%); background: #166534; color: white; padding: 14px 28px; border-radius: 30px; font-weight: 600; box-shadow: 0 10px 25px rgba(22, 101, 52, 0.4); z-index: 99999; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); opacity: 0; pointer-events: none;`;
  banner.textContent = msg;
  document.body.appendChild(banner);
  
  requestAnimationFrame(() => {
    banner.style.bottom = '24px';
    banner.style.opacity = '1';
  });

  setTimeout(() => {
    banner.style.bottom = '-50px';
    banner.style.opacity = '0';
    setTimeout(() => banner.remove(), 400);
  }, 3000);
}

window.resetCleanForm = function() {
  const form = document.getElementById('cleanForm');
  const succ = document.getElementById('cleanSuccess');
  if (form && succ) {
    form.reset();
    form.classList.remove('hidden');
    succ.classList.add('hidden');
  }
};

// ЗАПУСК
document.addEventListener('DOMContentLoaded', () => {
  setupFormsLogic();
  initAuthSystem();
  renderSights();
  renderTrees();
  initAdminLogic();
  updateLiveCounters();
  initRevealAnimation();
});