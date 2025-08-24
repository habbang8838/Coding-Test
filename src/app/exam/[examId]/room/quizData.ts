// app/exam/[examId]/room/quizData.ts
export const quizData = [
  {
    id: 1,
    question: "다음 중 회귀 평가 지표에 대한 설명으로 알맞지 않은 것은?",
    options: [
      "MAE : 실제값과 예측값 차의 절댓값 평균",
      "MSE : 실제값과 예측값 차의 제곱 평균",
      "RMSE : 평균 제곱 오차에 제곱근 취한 값",
      "MSLE : 예측값과 실제값에 로그를 취해 MSE를 계산한 값",
      "R² : 결정계수, 설명력 지표"
    ],
    correct: [3]
  },
  {
    id: 2,
    question: "상관계수에 대한 설명으로 옳은 것은?",
    options: [
      "절댓값이 1에 가까울수록 강한 상관관계이다",
      "스피어만 상관계수가 선형 상관관계 측정에 가장 많이 쓰인다",
      "피어슨 상관계수는 -1~1 범위를 갖는다",
      "상관계수는 항상 0 이상이다",
      "상관계수는 데이터의 크기(scale)에 영향을 받는다"
    ],
    correct: [0]
  },
  {
    id: 3,
    question: "Confusion Matrix에서 F1-score를 올바르게 설명한 것은?",
    options: [
      "정밀도(Precision)와 재현율(Recall)의 조화평균",
      "정밀도와 재현율의 산술평균",
      "정밀도와 재현율의 기하평균",
      "Accuracy와 동일하다",
      "TN과 FP의 비율을 의미한다"
    ],
    correct: [0]
  },
  {
    id: 4,
    question: "Gradient Descent의 주요 목적은?",
    options: [
      "손실 함수를 최소화하기 위해 파라미터를 업데이트",
      "데이터 차원 축소",
      "데이터 정규화",
      "과적합 방지",
      "하이퍼파라미터 최적화"
    ],
    correct: [0]
  },
  {
    id: 5,
    question: "Overfitting 방지 기법이 아닌 것은?",
    options: [
      "Dropout",
      "L2 Regularization",
      "Batch Normalization",
      "Early Stopping",
      "데이터 증강(Data Augmentation)"
    ],
    correct: [2]
  },
  {
    id: 6,
    question: "딥러닝에서 활성화 함수의 역할은?",
    options: [
      "모델을 선형 함수로 유지",
      "비선형성을 부여하여 복잡한 함수 근사",
      "가중치 초기화",
      "데이터 정규화",
      "손실 최소화"
    ],
    correct: [1]
  },
  {
    id: 7,
    question: "ReLU 함수의 단점은?",
    options: [
      "기울기 폭발 문제",
      "음수 입력에서 뉴런이 죽는 문제(Dead ReLU)",
      "출력 값의 범위 제한",
      "계산량 과다",
      "출력의 평균이 항상 0이 됨"
    ],
    correct: [1]
  },
  {
    id: 8,
    question: "다음 중 비지도 학습(Unsupervised Learning) 알고리즘은?",
    options: [
      "선형 회귀",
      "로지스틱 회귀",
      "K-Means",
      "Random Forest",
      "Decision Tree"
    ],
    correct: [2]
  },
  {
    id: 9,
    question: "PCA(주성분 분석)의 주요 목적은?",
    options: [
      "데이터 군집화",
      "차원 축소",
      "모델 정규화",
      "손실 최소화",
      "정밀도 향상"
    ],
    correct: [1]
  },
  {
    id: 10,
    question: "신경망 학습에서 Backpropagation의 핵심은?",
    options: [
      "가중치를 무작위로 초기화",
      "출력층에서 입력층으로 오차를 전파하여 기울기 계산",
      "데이터 정규화",
      "Batch를 나누어 학습",
      "손실 함수를 단순화"
    ],
    correct: [1]
  },
  {
    id: 11,
    question: "과적합을 탐지하기 위해 자주 사용하는 데이터 분할 방식은?",
    options: [
      "Train / Validation / Test",
      "Train / Test",
      "Validation / Test",
      "Train만",
      "Test만"
    ],
    correct: [0]
  },
  {
    id: 12,
    question: "CNN에서 Convolution Layer의 주요 역할은?",
    options: [
      "시계열 패턴 인식",
      "지역적 특징 추출",
      "데이터 정규화",
      "비선형성 강화",
      "차원 축소"
    ],
    correct: [1]
  },
  {
    id: 13,
    question: "RNN이 잘 다루는 데이터 형태는?",
    options: [
      "이미지",
      "시계열/순차 데이터",
      "그래프",
      "정적 데이터",
      "군집 데이터"
    ],
    correct: [1]
  },
  {
    id: 14,
    question: "Word2Vec의 Skip-gram 방식은?",
    options: [
      "주변 단어로 중심 단어 예측",
      "중심 단어로 주변 단어 예측",
      "문서 전체로 특정 단어 예측",
      "문장 길이 예측",
      "단어 빈도 예측"
    ],
    correct: [1]
  },
  {
    id: 15,
    question: "앙상블 기법 중 Bagging의 대표 알고리즘은?",
    options: [
      "XGBoost",
      "Random Forest",
      "Adaboost",
      "LightGBM",
      "CatBoost"
    ],
    correct: [1]
  },
  {
    id: 16,
    question: "ROC Curve에서 AUC 값이 1에 가까울수록 의미하는 것은?",
    options: [
      "무작위 예측",
      "성능이 뛰어남",
      "Underfitting",
      "데이터 불균형",
      "정규화 필요"
    ],
    correct: [1]
  },
  {
    id: 17,
    question: "Batch Normalization의 주요 장점은?",
    options: [
      "학습 안정화 및 빠른 수렴",
      "과적합 완전 제거",
      "데이터 정규화 대체",
      "차원 축소",
      "손실 함수 단순화"
    ],
    correct: [0]
  },
  {
    id: 18,
    question: "딥러닝에서 Dropout의 주된 목적은?",
    options: [
      "학습 속도 향상",
      "과적합 방지",
      "데이터 정규화",
      "차원 축소",
      "모델 압축"
    ],
    correct: [1]
  },
  {
    id: 19,
    question: "Transformer 모델의 핵심 구조는?",
    options: [
      "Convolution",
      "Recurrent Layer",
      "Self-Attention",
      "Decision Tree",
      "Random Projection"
    ],
    correct: [2]
  },
  {
    id: 20,
    question: "다음 중 지도 학습(Supervised Learning) 문제는?",
    options: [
      "스팸 메일 분류",
      "K-Means 군집화",
      "PCA 차원 축소",
      "Word2Vec 학습",
      "오토인코더"
    ],
    correct: [0]
  }
];