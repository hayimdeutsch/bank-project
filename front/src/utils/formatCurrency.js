export default function formatCurrency(num) {
  return '$' + new Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')  
}
