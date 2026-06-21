# DeveloperFolio Backend

باكند صغير للوحة تحكم الـportfolio، مبني بنفس روح مشروع `GermanyLang`: Clean Architecture، Vertical Slices، CQRS عبر MediatR، Carter Minimal APIs، FluentValidation، PostgreSQL وJWT.

## البنية

- `DeveloperFolio.Domain`: الكيانات وقواعد الدومين.
- `DeveloperFolio.Application`: حالات الاستخدام، الـendpoints، الـcommands والـqueries.
- `DeveloperFolio.Infrastructure`: PostgreSQL وJWT وتشفير كلمات المرور وتخزين الملفات.
- `DeveloperFolio.Api`: الإعدادات والـmiddleware وSwagger.
- `DeveloperFolio.Tests`: اختبارات الدومين والمعمارية والـAPI.

## التشغيل المحلي

المتطلبات: .NET 9 وDocker.

```powershell
cd backend
docker compose up -d
dotnet user-secrets set --project DeveloperFolio.Api "ConnectionStrings:Database" "Host=localhost;Port=5432;Database=developerfolio;Username=postgres;Password=postgres"
dotnet user-secrets set --project DeveloperFolio.Api "Jwt:Key" "ضع-هنا-مفتاحا-عشوائيا-بطول-32-محرفا-على-الأقل"
dotnet user-secrets set --project DeveloperFolio.Api "AdminSeed:Email" "admin@example.com"
dotnet user-secrets set --project DeveloperFolio.Api "AdminSeed:Password" "ضع-هنا-كلمة-مرور-قوية"
dotnet run --project DeveloperFolio.Api
```

عند أول تشغيل تُطبق الـmigrations ويعمل `AdminSeeder` لإنشاء حساب الأدمن من `AdminSeed`. العملية Idempotent حسب البريد ولا تعيد إنشاء الحساب أو تغيير كلمة مروره عند كل تشغيل. واجهة Swagger متاحة في بيئة Development على `/swagger`.

## الـAPI

- `POST /api/auth/login`
- `GET /api/projects`
- `GET /api/projects/{id}`
- `GET /api/resume`
- `GET /api/resume/download`
- `GET /api/admin/projects`
- `POST /api/admin/projects`
- `PUT /api/admin/projects/{id}`
- `DELETE /api/admin/projects/{id}`
- `POST /api/admin/resume` بصيغة `multipart/form-data` وحقل اسمه `file`، PDF وبحد أقصى 10 MB.
كل مسارات `/api/admin/*` تتطلب `Authorization: Bearer <token>`.

الـendpoints ترجع غلاف `OperationResult` موحدًا يحتوي `isSuccess` و`statusCode` و`error`، ومع النتائج التي تحمل بيانات يظهر الحقل `value`.

## التحقق

```powershell
dotnet build DeveloperFolio.sln
dotnet test DeveloperFolio.sln
```

الملفات تُحفظ محليًا افتراضيًا داخل `DeveloperFolio.Api/App_Data/uploads`. الواجهة `IFileStorage` تسمح باستبدالها لاحقًا بـR2 أو S3 دون تغيير حالات الاستخدام.
