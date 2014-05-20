function asshole () {
  this.hp = 15;
 
  this.primaryAttack = function(target) {
    target.hp = target.hp - 2;
  }
 
  this.specialAttack = function(target) {
    if (target.spikey == true) {
      this.hp = 0;
    } else {
      target.hp = target.hp - 20;
    }
  }
}
 
 
function Enemy (level) {
  this.hp = level * 10;
 
  this.primaryAttack = function(target) {
    target.hp = target.hp - (10 + level/4);
  }
 
  this.specialAttack = function(target) {
    target.hp = target.hp - 10;
    this.hp = this.hp + 10;
  }
}
 
var enemyLevel = 1;
 
$('.choose-asshole').click(function(){
  player = new asshole();
  enemy = new Enemy(enemyLevel)
 
  $('.choices').remove();
 
  $('.battle-menu').addClass('active');
 
  renderPlayerInfo(player);
  renderEnemyInfo(enemy);
 
})
 
function renderPlayerInfo (player) {
  if (player.hp < 1) {
    showGameOver()
  } else {
    $('.player-info').html("Player has " + player.hp + "hp")
  }
}
 
function renderEnemyInfo (enemy) {
  if (enemy.hp < 1) {
    $('.enemy-info').html("<span class='red'>enemy is dead but will return</span>")
  } else {
    $('.enemy-info').html("Enemy has " + enemy.hp + "hp")
  }
}
 
$('.primary').click(function(){
  player.primaryAttack(enemy);
  $('.status').html('You attack!')
  renderPlayerInfo(player);
  renderEnemyInfo(enemy);
 
  triggerEnemyAttack(player)
  
})
 
$('.special').click(function(){
  player.specialAttack(enemy);
  renderPlayerInfo(player);
  renderEnemyInfo(enemy);
 
  triggerEnemyAttack()
})
 
function showGameOver() {
  $('.game-over').addClass('active')
}
 
 
function triggerEnemyAttack () {
  setTimeout(function(){
    if (Math.floor(Math.random() * 10 ) > 6){
      enemy.specialAttack(player);   
      $('.status').html('Enemy special attack!')
    } else {
      enemy.primaryAttack(player);   
      $('.status').html('Enemy attack!')
    }
 
    renderPlayerInfo(player);
    renderEnemyInfo(enemy);
  }, 2000)
}