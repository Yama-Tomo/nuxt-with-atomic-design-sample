# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

branches = []

[
  ['営業', %w[第一営業部 第二営業部 法人営業部]],
  ['システム開発', %w[システム開発部 インフラ部 デザイン部]],
  ['総合', %w[総務部 法務部 カスタマーサポート]]
].each do |value|
  group = Group.new(name: value.first).tap(&:save)
  value.last.each do |branch|
    branches << group.branches.build(name: branch).tap(&:save)
  end
end

def save_employee(employees, branches, sex_id, country_id)
  employees.each do |employee|
    if country_id == 1
      last_name, first_name = employee.split ' '
    else
      first_name, last_name = employee.split ' '
    end
    emp = Employee.new(first_name: first_name, last_name: last_name, sex_id: sex_id, country_id: country_id)

    branches.sample(rand(3) + 1).each do |branch|
      emp.employee_branches.build(branch_id: branch.id).save
    end
  end

end

employees = ['三好 和男', '吉崎 俊明', '松林 正雄', '八巻 健志', '引地 大輝', '江間 宏典', '野辺 一広', '寺 隆生', '肥塚 勇紀',
'荒野 真琴', '亘 文人', '家城 晋介', '大菅 泰司', '桑波田 昌男', '大間 勝仁', '田鎖 清美', '成島 逸郎', '朝枝 将成',
'下川原 昭太', '菅生 伸久', '保田 寿雄', '針田 哲太郎', '鶴町 崇夫', '成迫 将則', '八村 賢史', '鹿俣 貞幸', '山長 和廣',
'尾台 敏郎', '絵里 富之', '椛本 岳']
save_employee(employees, branches, 1 ,1)

employees = ['矢澤 ゆりか', '中垣 篤子', '臼田 三千代', '竹川 みお', '深山 稚子', '永塚 ミカ', '橋川 栄里子', '仲谷 櫻子', '泉本 桃佳',
'遠田 英津子', '三善 誉子', '坂木 史穂', '野々下 花絵', '魚田 廣美', '類家 永', '浦澤 絵菜', '川原田 麻悠', '毒島 愛美',
'池脇 麻樹子', '小材 維', '夜桜 紅', '谷坂 優夏', '米地 由里佳', '光 陽菜子', '橘田 萌音', '西津 可奈美', '倉下 瑛莉',
'茂村 友記子', '梁島 沙依', '籠谷 千華']
save_employee(employees, branches, 2 ,1)

employees = ['Abdul Johnson', 'Cameron Scott', 'Cory Harrison', 'Cesar Chowdhury', 'Dalton Goyal', 'Mohit Griffith',
'Armando Espinoza', 'Gabe Velez', 'Shiva Rathore', 'Mahendra Blanchard', 'Chip Barrera', 'Rizwan Kong',
'Subhash Maddox', 'Waleed Crowe', 'Emil Hinton', 'Forrest Yen', 'Waseem Osorio', 'Huy Ziegler', 'Kristopher Riaz',
'Aldo Esteban', 'Efren Voss', 'Blair Tai', 'Dharmendra Baron', 'Min Marcos', 'Ignacio Afzal', 'Johnathon Chadwick',
'Guilherme Urban', 'Ollie McNeill', 'Omid Zia', 'Anirudh Meehan']
save_employee(employees, branches, 1 ,2)

employees = ['Elaine Ramos', 'Alicia Graham', 'Stella Burgess', 'Katy Todd', 'Natalia Shepherd', 'Rachelle Nash', 'Dianna Putri',
'Constance York', 'Dottie Khanna', 'Genevieve More', 'Kennedy Said', 'Peyton Guevara', 'Riza Galang',
'Sandie Bhattacharya', 'Geneva Burt', 'Ola Mohanty', 'Deepali Zhao', 'Yu Machado', 'Alberta Nel', 'Renuka Cee',
'Latha Tompkins', 'Khadija Roldan', 'Judie Esposito', 'Marlena Pretorius', 'Happy Barajas', 'Annika Linn',
'Na Hamdan', 'Kaylie Sai', 'Kaycee Woodson', 'Sylvie Yuan']
save_employee(employees, branches, 2 ,2)

employees = ['Walid Diallo', 'Sébastien Sousou', 'Hicham Tlili', 'Samuel Hamid', 'Sofiane Kh', 'Matthieu Habib', 'Wael Bennis',
'Johnny Guillet', 'Naim Barthelemy', 'Jean-Philippe Badri', 'Papa Rahali', 'Hassane Barca', 'Alphonse Brault',
'Hasan Jabri', 'Soufien Peron', 'Yasin Hiba', 'Nouredine Mabrouki', 'Mohssine Montagne', 'Calvin Conde',
'Xav Lepetit', 'Hamou Noureddine', 'Aurel Bay', 'Meziane Braham', 'Nils Vienne', 'Edgard Hadri', 'César Duez',
'Ian Rouault', 'Ess Moise', 'Charle Msekni', 'Isidore Carron']
save_employee(employees, branches, 1 ,3)

employees = ['Caroline Jiji', 'Carole Lesage', 'Danielle Menard', 'Coralie Lola', 'Katia Guichard', 'Anita Hamouda',
'Fatou Perron', 'Victoria Ferrer', 'Paulette Kieffer', 'Raja Lionel', 'Mylene Tison', 'Erika Loisel',
'Lindsay Mano', 'Megane Jullien', 'Amine Wane', 'Minoucha Astier', 'Pierre Deprez', 'Lisette Boussetta',
'Marie Louise Hamou', 'Jolie Gaucher', 'Marie-noelle Lecat', 'Alyssa Miloudi', 'Jihan Pin', 'Dalal Boileau',
'Hajoura Mortier', 'Nassira Vogel', 'Krystel Tomas', 'Marie-françoise Demoulin', 'Sima Sorel', 'Fayza Nguessan']
save_employee(employees, branches, 2 ,3)

