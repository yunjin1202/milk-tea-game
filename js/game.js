// ============================================================
//  🧚 奶茶仙境 - 童话风格完整版
// ============================================================

// ============================================================
//  交互反馈系统（启动界面所有元素点击都有反馈）
// ============================================================

function interactDeco(emoji, message) {
  // 弹出反馈文字
  var el = document.createElement('div');
  el.className = 'interact-feedback';
  el.textContent = emoji + ' ' + message;
  el.style.left = (20 + Math.random() * 60) + '%';
  el.style.top = (20 + Math.random() * 40) + '%';
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 900);

  // 收集星星（新增玩法）
  collectStar();
}

// ============================================================
//  梦幻星星收集系统（新增玩法）
// ============================================================

function getStarCount() {
  return parseInt(localStorage.getItem('fairyStars')) || 0;
}

function setStarCount(count) {
  localStorage.setItem('fairyStars', count);
  var display = document.getElementById('starCountDisplay');
  if (display) display.textContent = count;
}

function collectStar() {
  var current = getStarCount();
  var newCount = current + 1;
  setStarCount(newCount);

  // 显示收集动画
  var starEl = document.createElement('div');
  starEl.className = 'star-collected';
  starEl.textContent = '🌟';
  starEl.style.left = (30 + Math.random() * 40) + '%';
  starEl.style.top = (30 + Math.random() * 30) + '%';
  document.body.appendChild(starEl);
  setTimeout(function() { starEl.remove(); }, 1000);

  // 更新计数器显示
  var counter = document.getElementById('starCounter');
  if (counter) {
    counter.style.transform = 'scale(1.2)';
    setTimeout(function() { counter.style.transform = 'scale(1)'; }, 300);
  }
}

// ============================================================
//  游戏逻辑（基于上一版，保留完整功能）
// ============================================================

// ----- 数据定义 -----
var TEA_TYPES = [
  { id: 'black', label: '红茶', emoji: '🍂' },
  { id: 'green', label: '绿茶', emoji: '🍃' },
  { id: 'oolong', label: '乌龙', emoji: '🍁' }
];

var SUGAR_LEVELS = [
  { id: 'none', label: '无糖', emoji: '○' },
  { id: '30', label: '30%', emoji: '🌙' },
  { id: '50', label: '50%', emoji: '🌓' },
  { id: '70', label: '70%', emoji: '🌔' },
  { id: 'full', label: '全糖', emoji: '🌕' }
];

var TOPPINGS = [
  { id: 'tapioca', label: '珍珠', emoji: '⚫' },
  { id: 'coconut', label: '椰果', emoji: '🥥' },
  { id: 'pudding', label: '布丁', emoji: '🟨' },
  { id: 'redbean', label: '红豆', emoji: '🫘' },
  { id: 'grassjelly', label: '仙草', emoji: '🌿' },
  { id: 'none', label: '不加', emoji: '❌' }
];

var ICE_OPTIONS = [
  { id: 'none', label: '去冰', emoji: '🚫' },
  { id: 'less', label: '少冰', emoji: '🧊' },
  { id: 'regular', label: '正常', emoji: '❄️' }
];

var AVATARS = ['👩', '👨', '👧', '👦', '👩‍🦰', '👨‍🦱', '👵', '👴', '🧑‍🎤', '👩‍💼', '👨‍💼', '🧑‍🏫'];
var CHARACTER_NAMES = ['甜甜', '老王', '小明', '莉莉', '阿豪', '小美'];
var DRINKS = ['珍珠奶茶', '芋圆奶茶', '黑糖珍珠奶茶', '杨枝甘露', '草莓奶昔', '抹茶红豆奶茶', '奥利奥奶茶', '百香果绿茶'];

// ============================================================
//  关卡配置
// ============================================================

var LEVEL_CONFIG = [
  { level: 1, target: 3, maxOrders: 2, basePatience: 25, spawnInterval: 6000, availableToppings: ['tapioca', 'none'],
    hasIce: false, star1: 3, star2: 6, star3: 10 },
  { level: 2, target: 4, maxOrders: 3, basePatience: 22, spawnInterval: 5000, availableToppings: ['tapioca', 'coconut',
      'none'
    ], hasIce: true, star1: 5, star2: 10, star3: 16 },
  { level: 3, target: 4, maxOrders: 3, basePatience: 20, spawnInterval: 4500, availableToppings: ['tapioca', 'coconut',
      'pudding', 'none'
    ], hasIce: true, star1: 6, star2: 12, star3: 20 },
  { level: 4, target: 5, maxOrders: 4, basePatience: 18, spawnInterval: 4000, availableToppings: ['tapioca', 'coconut',
      'pudding', 'redbean', 'none'
    ], hasIce: true, star1: 8, star2: 16, star3: 26 },
  { level: 5, target: 5, maxOrders: 4, basePatience: 16, spawnInterval: 3800, availableToppings: ['tapioca', 'coconut',
      'pudding', 'redbean', 'grassjelly', 'none'
    ], hasIce: true, star1: 10, star2: 20, star3: 32 },
  { level: 6, target: 6, maxOrders: 5, basePatience: 15, spawnInterval: 3500, availableToppings: ['tapioca', 'coconut',
      'pudding', 'redbean', 'grassjelly', 'none'
    ], hasIce: true, star1: 12, star2: 24, star3: 38 },
  { level: 7, target: 6, maxOrders: 5, basePatience: 14, spawnInterval: 3200, availableToppings: ['tapioca', 'coconut',
      'pudding', 'redbean', 'grassjelly', 'none'
    ], hasIce: true, star1: 14, star2: 28, star3: 44 },
  { level: 8, target: 7, maxOrders: 6, basePatience: 13, spawnInterval: 3000, availableToppings: ['tapioca', 'coconut',
      'pudding', 'redbean', 'grassjelly', 'none'
    ], hasIce: true, star1: 16, star2: 32, star3: 50 },
  { level: 9, target: 7, maxOrders: 6, basePatience: 12, spawnInterval: 2800, availableToppings: ['tapioca', 'coconut',
      'pudding', 'redbean', 'grassjelly', 'none'
    ], hasIce: true, star1: 18, star2: 36, star3: 56 },
  { level: 10, target: 8, maxOrders: 7, basePatience: 10, spawnInterval: 2500, availableToppings: ['tapioca', 'coconut',
      'pudding', 'redbean', 'grassjelly', 'none'
    ], hasIce: true, star1: 20, star2: 40, star3: 64 }
];

// ============================================================
//  游戏状态
// ============================================================

var CONFIG = {
  baseCoins: 12,
  comboBonus: 8,
  comboThreshold: 2,
  health: 3
};

var gameState = {
  currentLevel: 1,
  maxUnlockedLevel: 1,
  levelTarget: 0,
  levelServed: 0,
  levelCoinsEarned: 0,
  levelStars: 0,
  health: CONFIG.health,
  coins: 0,
  combo: 0,
  highestCombo: 0,
  servedCount: 0,
  totalOrders: 0,
  expiredCount: 0,
  fastestTime: 999,
  gameActive: true,
  processing: false,
  levelComplete: false,
  currentOrderId: null,
  orders: [],
  selections: { tea: null, sugar: null, topping: null, ice: null },
  spawnTimer: null,
  tickTimer: null,
  orderIdCounter: 0
};

// ----- DOM 引用 -----
function $(id) { return document.getElementById(id); }

var splashScreen = $('splashScreen');
var gameScreen = $('gameScreen');
var btnStart = $('btnStartGame');
var btnBack = $('btnBackToMenu');

var healthDigits = $('healthDigits');
var coinDigits = $('coinDigits');
var comboDigits = $('comboDigits');
var servedDigits = $('servedDigits');
var orderList = $('orderList');
var orderCount = $('orderCount');
var previewZone = $('previewZone');
var btnClear = $('btnClear');
var btnComplete = $('btnComplete');
var feedbackOverlay = $('feedbackOverlay');
var feedbackBanner = $('feedbackBanner');
var feedbackDetail = $('feedbackDetail');
var settlementModal = $('settlementModal');
var levelBadge = $('levelBadge');
var levelProgressFill = $('levelProgressFill');
var levelProgressCount = $('levelProgressCount');

// ----- 工具函数 -----
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function getEmoji(arr, id) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return arr[i].emoji;
  }
  return '❓';
}

function getLevelConfig(levelId) {
  for (var i = 0; i < LEVEL_CONFIG.length; i++) {
    if (LEVEL_CONFIG[i].level === levelId) return LEVEL_CONFIG[i];
  }
  return LEVEL_CONFIG[0];
}

function getAvailableToppings(levelId) {
  var config = getLevelConfig(levelId);
  return config.availableToppings || ['tapioca', 'none'];
}

function pickCharacterName() {
  return CHARACTER_NAMES[Math.floor(Math.random() * CHARACTER_NAMES.length)];
}

function pickAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}

// ----- 生成随机订单 -----
function generateOrder() {
  var config = getLevelConfig(gameState.currentLevel);
  var availableToppings = getAvailableToppings(gameState.currentLevel);
  var hasIce = config.hasIce !== undefined ? config.hasIce : true;
  var drinkName = pick(DRINKS);

  return {
    id: ++gameState.orderIdCounter,
    drinkName: drinkName,
    tea: pick(TEA_TYPES).id,
    sugar: pick(SUGAR_LEVELS).id,
    topping: pick(availableToppings),
    ice: hasIce ? pick(ICE_OPTIONS).id : 'none',
    avatar: pickAvatar(),
    characterName: pickCharacterName(),
    patience: 0,
    maxPatience: 0,
    status: 'waiting',
    startTime: 0
  };
}

function calculatePatience() {
  var config = getLevelConfig(gameState.currentLevel);
  var basePatience = config.basePatience || 20;
  var activeCount = 0;
  for (var i = 0; i < gameState.orders.length; i++) {
    if (gameState.orders[i].status === 'waiting' || gameState.orders[i].status === 'active') {
      activeCount++;
    }
  }
  var penalty = Math.max(0, (activeCount - 1) * 1.5);
  var patience = Math.max(5, basePatience - penalty);
  patience += (Math.random() - 0.5) * 2;
  return Math.round(patience);
}

// ----- 添加新订单 -----
function spawnOrder() {
  if (!gameState.gameActive || gameState.levelComplete) return;

  var config = getLevelConfig(gameState.currentLevel);
  var maxOrders = config.maxOrders || 4;

  var activeCount = 0;
  for (var i = 0; i < gameState.orders.length; i++) {
    if (gameState.orders[i].status === 'waiting' || gameState.orders[i].status === 'active') {
      activeCount++;
    }
  }

  if (activeCount >= maxOrders) return;

  var order = generateOrder();
  order.maxPatience = calculatePatience();
  order.patience = order.maxPatience;
  order.startTime = Date.now();
  order.status = 'waiting';
  gameState.orders.push(order);
  gameState.totalOrders++;

  renderOrders();
  updateUI();
}

// ----- 渲染订单列表 -----
function renderOrders() {
  var html = '';
  var activeCount = 0;

  for (var i = 0; i < gameState.orders.length; i++) {
    var o = gameState.orders[i];
    var displayName = o.characterName || '顾客';
    var avatarEmoji = o.avatar || '👤';

    if (o.status === 'completed' || o.status === 'expired') {
      var statusIcon = o.status === 'completed' ? '✅' : '💀';
      html += '<div class="order-card ' + o.status + '">' +
        '<span class="order-avatar">' + avatarEmoji + '</span>' +
        '<div class="order-detail">' +
        '<span style="font-weight:bold;color:#6b3f8a;font-size:13px;">' + o.drinkName + '</span>' +
        '<span style="font-size:13px;opacity:0.5;"> · </span>' +
        getEmoji(TEA_TYPES, o.tea) +
        '<span class="plus-icon">➕</span>' +
        getEmoji(SUGAR_LEVELS, o.sugar) +
        '<span class="plus-icon">➕</span>' +
        (o.topping !== 'none' ? getEmoji(TOPPINGS, o.topping) : '🚫') +
        (o.ice !== 'none' ? '<span class="plus-icon">➕</span>' + getEmoji(ICE_OPTIONS, o.ice) : '') +
        '</div>' +
        '<span class="order-status">' + statusIcon + '</span>' +
        '</div>';
      continue;
    }

    activeCount++;
    var isActive = o.status === 'active';
    var isWaiting = o.status === 'waiting';
    var timeLeft = Math.max(0, o.patience);
    var timeDisplay = timeLeft.toFixed(1) + 's';
    var warningClass = timeLeft < 3 ? 'warning' : '';

    var btnHtml = '';
    if (isWaiting) {
      btnHtml = '<button class="order-btn" data-id="' + o.id + '">📋 接单</button>';
    } else if (isActive) {
      btnHtml = '<button class="order-btn" data-id="' + o.id + '" disabled>⏳ 制作中</button>';
    }

    var cardClass = 'order-card';
    if (isActive) cardClass += ' active';

    html += '<div class="' + cardClass + '" data-id="' + o.id + '">' +
      '<span class="order-avatar">' + avatarEmoji + '</span>' +
      '<div class="order-detail">' +
      '<span style="font-weight:bold;color:#6b3f8a;font-size:13px;">' + o.drinkName + '</span>' +
      '<span style="font-size:13px;opacity:0.5;"> · </span>' +
      getEmoji(TEA_TYPES, o.tea) +
      '<span class="plus-icon">➕</span>' +
      getEmoji(SUGAR_LEVELS, o.sugar) +
      '<span class="plus-icon">➕</span>' +
      (o.topping !== 'none' ? getEmoji(TOPPINGS, o.topping) : '🚫') +
      (o.ice !== 'none' ? '<span class="plus-icon">➕</span>' + getEmoji(ICE_OPTIONS, o.ice) : '') +
      '<span style="font-size:10px;color:#8d6e8d;margin-left:3px;">(' + displayName + ')</span>' +
      '</div>' +
      '<span class="order-timer ' + warningClass + '">' + timeDisplay + '</span>' +
      btnHtml +
      '</div>';
  }

  orderList.innerHTML = html;
  orderCount.textContent = activeCount;

  var btns = orderList.querySelectorAll('.order-btn');
  for (var j = 0; j < btns.length; j++) {
    (function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var id = parseInt(btn.dataset.id);
        takeOrder(id);
      });
      btn.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var id = parseInt(btn.dataset.id);
        takeOrder(id);
      });
    })(btns[j]);
  }

  var cards = orderList.querySelectorAll('.order-card:not(.completed):not(.expired)');
  for (var k = 0; k < cards.length; k++) {
    (function(card) {
      card.addEventListener('click', function() {
        var id = parseInt(card.dataset.id);
        for (var m = 0; m < gameState.orders.length; m++) {
          if (gameState.orders[m].id === id && gameState.orders[m].status === 'waiting') {
            takeOrder(id);
            break;
          }
        }
      });
    })(cards[k]);
  }
}

// ----- 接单 -----
function takeOrder(orderId) {
  if (!gameState.gameActive || gameState.processing || gameState.levelComplete) return;

  var targetOrder = null;
  for (var i = 0; i < gameState.orders.length; i++) {
    if (gameState.orders[i].id === orderId) {
      targetOrder = gameState.orders[i];
      break;
    }
  }

  if (!targetOrder || targetOrder.status !== 'waiting') return;

  if (gameState.currentOrderId !== null) {
    for (var j = 0; j < gameState.orders.length; j++) {
      if (gameState.orders[j].id === gameState.currentOrderId && gameState.orders[j].status === 'active') {
        gameState.orders[j].status = 'waiting';
        break;
      }
    }
  }

  targetOrder.status = 'active';
  gameState.currentOrderId = targetOrder.id;

  gameState.selections = { tea: null, sugar: null, topping: null, ice: targetOrder.ice || null };
  document.querySelectorAll('.option-btn').forEach(function(b) { b.classList.remove('selected'); });

  renderOrders();
  updatePreview();
  updateUI();

  var prepStation = $('prepStation');
  prepStation.scrollTop = 0;
}

// ----- 渲染选项 -----
function renderOptions() {
  var teaContainer = $('teaOptions');
  var sugarContainer = $('sugarOptions');
  var toppingContainer = $('toppingOptions');
  var iceContainer = $('iceOptions');

  var teaHTML = '';
  for (var i = 0; i < TEA_TYPES.length; i++) {
    var t = TEA_TYPES[i];
    teaHTML += '<button class="option-btn" data-step="tea" data-id="' + t.id + '">' +
      '<span class="opt-emoji">' + t.emoji + '</span>' +
      '<span class="opt-label">' + t.label + '</span>' +
      '</button>';
  }
  teaContainer.innerHTML = teaHTML;

  var sugarHTML = '';
  for (var j = 0; j < SUGAR_LEVELS.length; j++) {
    var s = SUGAR_LEVELS[j];
    sugarHTML += '<button class="option-btn" data-step="sugar" data-id="' + s.id + '">' +
      '<span class="opt-emoji">' + s.emoji + '</span>' +
      '<span class="opt-label">' + s.label + '</span>' +
      '</button>';
  }
  sugarContainer.innerHTML = sugarHTML;

  var availableToppings = getAvailableToppings(gameState.currentLevel);
  var toppingHTML = '';
  for (var k = 0; k < TOPPINGS.length; k++) {
    var tp = TOPPINGS[k];
    var isAvailable = false;
    for (var a = 0; a < availableToppings.length; a++) {
      if (availableToppings[a] === tp.id) { isAvailable = true; break; }
    }
    if (!isAvailable) continue;
    toppingHTML += '<button class="option-btn" data-step="topping" data-id="' + tp.id + '">' +
      '<span class="opt-emoji">' + tp.emoji + '</span>' +
      '<span class="opt-label">' + tp.label + '</span>' +
      '</button>';
  }
  toppingContainer.innerHTML = toppingHTML;

  var config = getLevelConfig(gameState.currentLevel);
  var iceHTML = '';
  if (config.hasIce) {
    for (var l = 0; l < ICE_OPTIONS.length; l++) {
      var ic = ICE_OPTIONS[l];
      iceHTML += '<button class="option-btn" data-step="ice" data-id="' + ic.id + '">' +
        '<span class="opt-emoji">' + ic.emoji + '</span>' +
        '<span class="opt-label">' + ic.label + '</span>' +
        '</button>';
    }
  } else {
    iceHTML = '<div style="font-size:15px;color:#5a3a6a;padding:4px 16px;background:rgba(255,255,255,0.3);border-radius:30px;">🚫 去冰</div>';
    gameState.selections.ice = 'none';
  }
  iceContainer.innerHTML = iceHTML;

  var allBtns = document.querySelectorAll('.option-btn');
  for (var m = 0; m < allBtns.length; m++) {
    (function(btn) {
      btn.addEventListener('click', function() {
        selectOption(btn.dataset.step, btn.dataset.id);
      });
      btn.addEventListener('touchend', function(e) {
        e.preventDefault();
        selectOption(btn.dataset.step, btn.dataset.id);
      });
    })(allBtns[m]);
  }

  if (!config.hasIce) {
    gameState.selections.ice = 'none';
    updatePreview();
  }
}

// ----- 选择 -----
function selectOption(step, id) {
  if (!gameState.gameActive || gameState.processing) return;
  gameState.selections[step] = id;
  var btns = document.querySelectorAll('.option-btn[data-step="' + step + '"]');
  for (var i = 0; i < btns.length; i++) {
    if (btns[i].dataset.id === id) {
      btns[i].classList.add('selected');
    } else {
      btns[i].classList.remove('selected');
    }
  }
  updatePreview();
}

function clearSelection() {
  var currentOrder = null;
  for (var i = 0; i < gameState.orders.length; i++) {
    if (gameState.orders[i].id === gameState.currentOrderId && gameState.orders[i].status === 'active') {
      currentOrder = gameState.orders[i];
      break;
    }
  }
  gameState.selections = {
    tea: null,
    sugar: null,
    topping: null,
    ice: currentOrder ? currentOrder.ice : null
  };
  var allBtns = document.querySelectorAll('.option-btn');
  for (var j = 0; j < allBtns.length; j++) {
    allBtns[j].classList.remove('selected');
  }
  updatePreview();
}

// ----- 预览 -----
function updatePreview() {
  var s = gameState.selections;
  var config = getLevelConfig(gameState.currentLevel);
  var needIce = config.hasIce !== undefined ? config.hasIce : true;
  var hasOrder = gameState.currentOrderId !== null;
  var allSelected = s.tea && s.sugar && s.topping && (needIce ? s.ice : true);

  if (!hasOrder) {
    previewZone.innerHTML =
      '<div class="preview-icons">📋</div>' +
      '<div class="preview-hint">点击订单开始制作</div>';
    btnComplete.disabled = true;
    return;
  }

  if (!s.tea && !s.sugar && !s.topping) {
    previewZone.innerHTML =
      '<div class="preview-icons">🧋</div>' +
      '<div class="preview-hint">选择配料制作奶茶</div>';
    btnComplete.disabled = true;
    return;
  }

  var parts = [];
  if (s.tea) parts.push(getEmoji(TEA_TYPES, s.tea));
  if (s.sugar) parts.push(getEmoji(SUGAR_LEVELS, s.sugar));
  if (s.topping && s.topping !== 'none') parts.push(getEmoji(TOPPINGS, s.topping));
  if (needIce && s.ice && s.ice !== 'none') parts.push(getEmoji(ICE_OPTIONS, s.ice));

  if (allSelected) {
    previewZone.className = 'preview-zone ready';
    previewZone.innerHTML =
      '<div style="font-size:14px;color:#4a8a4a;font-weight:bold;">✅ 可以完成！</div>' +
      '<div class="preview-icons">' + parts.join(' ') + '</div>';
    btnComplete.disabled = false;
  } else {
    previewZone.className = 'preview-zone';
    previewZone.innerHTML =
      '<div class="preview-icons">' + parts.join(' ') + '</div>' +
      '<div class="preview-hint">继续选择...</div>';
    btnComplete.disabled = true;
  }
}

// ============================================================
//  提交订单
// ============================================================

function submitOrder() {
  if (!gameState.gameActive || gameState.processing || gameState.levelComplete) return;
  if (gameState.currentOrderId === null) return;

  var s = gameState.selections;
  var config = getLevelConfig(gameState.currentLevel);
  var needIce = config.hasIce !== undefined ? config.hasIce : true;
  if (!s.tea || !s.sugar || !s.topping || (needIce && !s.ice)) return;

  var targetOrder = null;
  for (var i = 0; i < gameState.orders.length; i++) {
    if (gameState.orders[i].id === gameState.currentOrderId) {
      targetOrder = gameState.orders[i];
      break;
    }
  }

  if (!targetOrder || targetOrder.status !== 'active') return;

  gameState.processing = true;

  var isCorrect = s.tea === targetOrder.tea &&
    s.sugar === targetOrder.sugar &&
    s.topping === targetOrder.topping &&
    (needIce ? s.ice === targetOrder.ice : true);

  if (isCorrect) {
    var timeTaken = (Date.now() - targetOrder.startTime) / 1000;
    if (timeTaken < gameState.fastestTime) gameState.fastestTime = timeTaken;

    var earned = CONFIG.baseCoins + Math.floor(Math.random() * 5);
    if (gameState.combo >= CONFIG.comboThreshold) earned += CONFIG.comboBonus;

    gameState.coins += earned;
    gameState.levelCoinsEarned += earned;
    gameState.combo++;
    gameState.servedCount++;
    gameState.levelServed++;
    if (gameState.combo > gameState.highestCombo) gameState.highestCombo = gameState.combo;

    targetOrder.status = 'completed';

    var detail = '+' + earned + '🪙';
    if (gameState.combo >= CONFIG.comboThreshold) detail += ' 🔥' + gameState.combo + '连击！';
    if (timeTaken < 5) detail += ' ⚡' + timeTaken.toFixed(1) + 's';
    showFeedback('✅', detail, '#60b860');

    if (gameState.levelServed >= gameState.levelTarget) {
      gameState.levelComplete = true;
      setTimeout(function() {
        gameState.currentOrderId = null;
        gameState.processing = false;
        gameState.selections = { tea: null, sugar: null, topping: null, ice: null };
        document.querySelectorAll('.option-btn').forEach(function(b) { b.classList.remove('selected'); });
        removeCompletedOrders();
        renderOrders();
        updatePreview();
        updateUI();
        completeLevel();
      }, 700);
    } else {
      setTimeout(function() {
        gameState.currentOrderId = null;
        gameState.processing = false;
        gameState.selections = { tea: null, sugar: null, topping: null, ice: null };
        document.querySelectorAll('.option-btn').forEach(function(b) { b.classList.remove('selected'); });
        removeCompletedOrders();
        renderOrders();
        updatePreview();
        updateUI();
      }, 600);
    }
  } else {
    gameState.combo = 0;
    gameState.health--;
    targetOrder.status = 'waiting';
    gameState.currentOrderId = null;
    showFeedback('❌', '订单错误！-1❤️', '#d4706a');

    setTimeout(function() {
      gameState.processing = false;
      gameState.selections = { tea: null, sugar: null, topping: null, ice: null };
      document.querySelectorAll('.option-btn').forEach(function(b) { b.classList.remove('selected'); });
      renderOrders();
      updatePreview();
      updateUI();
      if (gameState.health <= 0) {
        endGame();
      }
    }, 800);
  }
}

function removeCompletedOrders() {
  var remaining = [];
  for (var i = 0; i < gameState.orders.length; i++) {
    if (gameState.orders[i].status !== 'completed') {
      remaining.push(gameState.orders[i]);
    }
  }
  gameState.orders = remaining;
}

// ============================================================
//  时间更新
// ============================================================

function tickOrders() {
  if (!gameState.gameActive || gameState.levelComplete) return;

  var now = Date.now();
  var changed = false;

  for (var i = gameState.orders.length - 1; i >= 0; i--) {
    var o = gameState.orders[i];

    if (o.status !== 'waiting' && o.status !== 'active') continue;

    var elapsed = (now - o.startTime) / 1000;
    var remaining = o.maxPatience - elapsed;

    if (remaining <= 0) {
      if (o.status === 'active') {
        if (gameState.currentOrderId === o.id) {
          gameState.currentOrderId = null;
          gameState.selections = { tea: null, sugar: null, topping: null, ice: null };
          document.querySelectorAll('.option-btn').forEach(function(b) { b.classList.remove('selected'); });
          updatePreview();
        }
      }
      o.status = 'expired';
      o.patience = 0;
      gameState.expiredCount++;
      gameState.combo = 0;
      gameState.health--;
      changed = true;
      showFeedback('💀', '订单超时！-1❤️', '#d4706a');

      if (gameState.health <= 0) {
        endGame();
        return;
      }
    } else {
      o.patience = remaining;
    }
  }

  if (changed) {
    renderOrders();
    updateUI();
  }
}

// ============================================================
//  关卡完成
// ============================================================

function completeLevel() {
  var config = getLevelConfig(gameState.currentLevel);
  var earned = gameState.levelCoinsEarned;
  var stars = 1;
  if (earned >= config.star3) stars = 3;
  else if (earned >= config.star2) stars = 2;
  gameState.levelStars = stars;

  if (gameState.currentLevel >= gameState.maxUnlockedLevel) {
    gameState.maxUnlockedLevel = Math.min(gameState.currentLevel + 1, 10);
  }

  $('settlementBanner').textContent = '🎉 第 ' + gameState.currentLevel + ' 关完成！';
  $('starsDisplay').textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
  $('finalServed').textContent = gameState.levelServed + '/' + gameState.levelTarget;
  $('finalCoins').textContent = gameState.levelCoinsEarned;
  $('finalCombo').textContent = gameState.highestCombo;
  $('finalSpeed').textContent = gameState.fastestTime < 999 ? gameState.fastestTime.toFixed(1) + 's' : '--';

  var hsArea = $('highScoreArea');
  hsArea.innerHTML = '<div style="font-size:18px;color:#6b3f8a;margin:8px 0;">🏅 获得 ' + stars + ' 星！</div>';

  var restartBtn = $('btnRestart');
  if (gameState.currentLevel < 10) {
    restartBtn.textContent = '➡️ 下一关 (第' + (gameState.currentLevel + 1) + '关)';
    restartBtn.className = 'restart-btn next-btn';
    restartBtn.dataset.action = 'next';
  } else {
    restartBtn.textContent = '🏆 通关！再来一次';
    restartBtn.className = 'restart-btn';
    restartBtn.dataset.action = 'restart';
  }

  settlementModal.classList.add('show');
}

function goToNextLevel() {
  settlementModal.classList.remove('show');
  gameState.currentLevel++;
  var config = getLevelConfig(gameState.currentLevel);
  gameState.levelTarget = config.target || 5;
  gameState.levelServed = 0;
  gameState.levelCoinsEarned = 0;
  gameState.levelComplete = false;
  gameState.health = Math.min(gameState.health + 1, 3);
  gameState.processing = false;
  gameState.gameActive = true;
  gameState.currentOrderId = null;
  gameState.orders = [];
  gameState.selections = { tea: null, sugar: null, topping: null, ice: null };
  document.querySelectorAll('.option-btn').forEach(function(b) { b.classList.remove('selected'); });

  updateUI();
  renderOptions();
  renderOrders();
  updatePreview();

  var restartBtn = $('btnRestart');
  restartBtn.textContent = '🔄 再来一局';
  restartBtn.className = 'restart-btn';
  restartBtn.dataset.action = 'restart';

  if (gameState.spawnTimer) { clearInterval(gameState.spawnTimer); }
  if (gameState.tickTimer) { clearInterval(gameState.tickTimer); }

  gameState.spawnTimer = setInterval(function() { spawnOrder(); }, config.spawnInterval || 4000);
  gameState.tickTimer = setInterval(function() { tickOrders(); }, 500);

  setTimeout(function() { spawnOrder(); }, 400);
  setTimeout(function() { spawnOrder(); }, 900);
}

// ============================================================
//  游戏结束
// ============================================================

function endGame() {
  gameState.gameActive = false;
  if (gameState.spawnTimer) { clearInterval(gameState.spawnTimer);
    gameState.spawnTimer = null; }
  if (gameState.tickTimer) { clearInterval(gameState.tickTimer);
    gameState.tickTimer = null; }

  var stars = 1;
  if (gameState.servedCount >= 15) stars = 3;
  else if (gameState.servedCount >= 8) stars = 2;

  var prev = parseInt(localStorage.getItem('milkTeaExpressHighScore')) || 0;
  var isRecord = gameState.coins > prev;
  if (isRecord) localStorage.setItem('milkTeaExpressHighScore', gameState.coins);

  $('settlementBanner').textContent = '💔 游戏结束';
  $('starsDisplay').textContent = '😢 再接再厉';
  $('finalServed').textContent = gameState.servedCount;
  $('finalCoins').textContent = gameState.coins;
  $('finalCombo').textContent = gameState.highestCombo;
  $('finalSpeed').textContent = gameState.fastestTime < 999 ? gameState.fastestTime.toFixed(1) + 's' : '--';

  var hsArea = $('highScoreArea');
  if (isRecord) {
    hsArea.innerHTML = '<div class="highscore-row">🏆 新纪录！</div>';
  } else {
    hsArea.innerHTML = '<div class="highscore-row">🏅 最高分: ' + Math.max(prev, gameState.coins) + '</div>';
  }

  var restartBtn = $('btnRestart');
  restartBtn.textContent = '🔄 重新开始';
  restartBtn.className = 'restart-btn';
  restartBtn.dataset.action = 'restart';

  settlementModal.classList.add('show');
}

function restartGame() {
  settlementModal.classList.remove('show');
  startGameInternal();
}

// ============================================================
//  UI更新
// ============================================================

function updateUI() {
  var hearts = '';
  for (var i = 0; i < gameState.health; i++) hearts += '❤️';
  for (var j = gameState.health; j < CONFIG.health; j++) hearts += '🖤';
  healthDigits.textContent = hearts || '💀';
  coinDigits.textContent = gameState.coins;
  comboDigits.textContent = gameState.combo;
  servedDigits.textContent = gameState.servedCount;

  levelBadge.textContent = '第 ' + gameState.currentLevel + ' 关';
  var progress = gameState.levelTarget > 0 ? (gameState.levelServed / gameState.levelTarget) * 100 : 0;
  levelProgressFill.style.width = Math.min(100, progress) + '%';
  levelProgressCount.textContent = gameState.levelServed + '/' + gameState.levelTarget;
}

function showFeedback(icon, text, color) {
  feedbackBanner.textContent = icon;
  feedbackDetail.innerHTML = '<span style="color:' + color + '">' + text + '</span>';
  feedbackOverlay.classList.add('show');
  setTimeout(function() {
    feedbackOverlay.classList.remove('show');
  }, 900);
}

// ============================================================
//  启动/切换
// ============================================================

function startGameInternal() {
  gameState = {
    currentLevel: 1,
    maxUnlockedLevel: 1,
    levelTarget: getLevelConfig(1).target || 5,
    levelServed: 0,
    levelCoinsEarned: 0,
    levelStars: 0,
    health: CONFIG.health,
    coins: 0,
    combo: 0,
    highestCombo: 0,
    servedCount: 0,
    totalOrders: 0,
    expiredCount: 0,
    fastestTime: 999,
    gameActive: true,
    processing: false,
    levelComplete: false,
    currentOrderId: null,
    orders: [],
    selections: { tea: null, sugar: null, topping: null, ice: null },
    spawnTimer: null,
    tickTimer: null,
    orderIdCounter: 0
  };

  renderOptions();
  updateUI();
  renderOrders();
  updatePreview();

  var config = getLevelConfig(1);
  gameState.spawnTimer = setInterval(function() { spawnOrder(); }, config.spawnInterval || 4000);
  gameState.tickTimer = setInterval(function() { tickOrders(); }, 500);

  setTimeout(function() { spawnOrder(); }, 400);
  setTimeout(function() { spawnOrder(); }, 900);
}

function startGame() {
  splashScreen.classList.add('hide');
  gameScreen.classList.remove('hide');
  startGameInternal();
}

function backToMenu() {
  gameState.gameActive = false;
  if (gameState.spawnTimer) { clearInterval(gameState.spawnTimer);
    gameState.spawnTimer = null; }
  if (gameState.tickTimer) { clearInterval(gameState.tickTimer);
    gameState.tickTimer = null; }
  settlementModal.classList.remove('show');
  feedbackOverlay.classList.remove('show');
  gameScreen.classList.add('hide');
  splashScreen.classList.remove('hide');
}

// ============================================================
//  事件绑定
// ============================================================

btnStart.addEventListener('click', startGame);
btnBack.addEventListener('click', backToMenu);

btnClear.addEventListener('click', clearSelection);
btnClear.addEventListener('touchend', function(e) {
  e.preventDefault();
  clearSelection();
});

btnComplete.addEventListener('click', submitOrder);
btnComplete.addEventListener('touchend', function(e) {
  e.preventDefault();
  if (!btnComplete.disabled) submitOrder();
});

$('btnRestart').addEventListener('click', function() {
  if (this.dataset.action === 'next') {
    goToNextLevel();
  } else {
    restartGame();
  }
});
$('btnRestart').addEventListener('touchend', function(e) {
  e.preventDefault();
  if (this.dataset.action === 'next') {
    goToNextLevel();
  } else {
    restartGame();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !btnComplete.disabled) {
    e.preventDefault();
    submitOrder();
  }
  if (e.key === 'c' || e.key === 'C') {
    e.preventDefault();
    clearSelection();
  }
  if (e.key === 'Escape') {
    if (settlementModal.classList.contains('show')) {
      settlementModal.classList.remove('show');
    }
    if (feedbackOverlay.classList.contains('show')) {
      feedbackOverlay.classList.remove('show');
    }
  }
  if ((e.key === ' ' || e.key === 'Space') && settlementModal.classList.contains('show')) {
    e.preventDefault();
    var btn = $('btnRestart');
    if (btn.dataset.action === 'next') {
      goToNextLevel();
    } else {
      restartGame();
    }
  }
});

// ============================================================
//  初始化 - 显示星星数量
// ============================================================

var starDisplay = document.getElementById('starCountDisplay');
if (starDisplay) {
  starDisplay.textContent = getStarCount();
}

renderOptions();
updateUI();
renderOrders();
updatePreview();

// 初始化时给启动界面交互提示
setTimeout(function() {
  var msg = document.createElement('div');
  msg.style.position = 'fixed';
  msg.style.bottom = '100px';
  msg.style.left = '50%';
  msg.style.transform = 'translateX(-50%)';
  msg.style.background = 'rgba(60,30,80,0.8)';
  msg.style.color = '#fff';
  msg.style.padding = '8px 24px';
  msg.style.borderRadius = '40px';
  msg.style.fontSize = '16px';
  msg.style.fontWeight = 'bold';
  msg.style.zIndex = '50';
  msg.style.backdropFilter = 'blur(4px)';
  msg.style.border = '2px solid rgba(255,255,255,0.2)';
  msg.style.textAlign = 'center';
  msg.textContent = '✨ 点击任何装饰收集梦幻星星 ✨';
  document.body.appendChild(msg);
  setTimeout(function() {
    msg.style.transition = 'opacity 1s';
    msg.style.opacity = '0';
    setTimeout(function() { msg.remove(); }, 1200);
  }, 3500);
}, 500);