export const handleToThirdPage = type => {
  switch (type) {
    case '1':
      window.open('http://m.bendibao.com/news/gelizhengce/all.php', '_blank');
      break;
    case '2':
      window.open('http://bj.bendibao.com/news/gelizhengce/all.php', '_blank');
      break;
    case '3':
      window.open('http://bj.bendibao.com/news/hesuanjiance/jiancedidian.php', '_blank');
      break;
    default:
      break;
  }
};
